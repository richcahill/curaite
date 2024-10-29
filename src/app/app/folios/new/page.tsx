"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect, useCallback } from "react";
import { Wand } from "lucide-react";
import { ReadingTime } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { auth, firestore } from "@/lib/firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function NewFolio() {
  const user = auth.currentUser;
  const router = useRouter();
  // Define Zod schema for form validation
  const folioSchema = z.object({
    title: z.string().min(1, "Title is required"),
    audience: z.string().min(1, "Audience is required"),
    process: z.string().min(1, "Process is required"),
    readingTime: z.object({
      value: z.string().min(1, "Reading time is required"),
      time: z.string().min(1, "Reading time is required"),
    }),
  });

  // State variables
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [process, setProcess] = useState("");
  const [readingTime, setReadingTime] = useState<ReadingTime>({
    value: "Medium",
    time: "3 min",
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const readingTimes = [
    { value: "Short", time: "1 min" },
    { value: "Medium", time: "3 min" },
    { value: "Long", time: "5 min" },
    { value: "Very Long", time: "10 min" },
  ];

  // Validate form inputs using useCallback
  const validateForm = useCallback(() => {
    const formData = {
      title,
      audience,
      process,
      readingTime,
    };

    const result = folioSchema.safeParse(formData);
    setIsFormValid(result.success);
  }, [title, audience, process, readingTime, folioSchema]);

  // Update handleSubmit to send data to the API
  const handleSubmit = async () => {
    if (!isFormValid) return;

    const formData = {
      title,
      audience,
      process,
      readingTime,
      ownerUserId: user?.uid,
    };

    // Validate form data
    const result = folioSchema.safeParse(formData);

    if (!result.success) {
      // Handle validation errors
      console.error(result.error.format());
      return;
    }

    // Proceed with form submission
    console.log("Form data is valid:", result.data);

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/llm/generate-folio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(result.data),
      });

      const data = await response.json();

      if (data.folio) {
        // Handle the generated folio
        console.log("Generated Folio:", data.folio);
        try {
          const folioDoc = doc(
            collection(firestore, `folios/${user?.uid}/folios`)
          );
          await setDoc(folioDoc, data.folio);
          // push the user to the new path
          router.push(`/app/folios/${data.folio.uuid}`);
        } catch (error) {
          console.error("Error saving folio to Firestore:", error);
          setError("An error occurred while saving the folio.");
        }
      } else if (data.error) {
        console.error("Error:", data.error);
        setError(data.error);
      } else {
        console.log("Result:", data.result);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("An error occurred while generating the folio.");
    } finally {
      setIsLoading(false);
    }
  };

  // Validate form whenever inputs change
  useEffect(() => {
    validateForm();
  }, [title, audience, process, readingTime, validateForm]);

  return (
    <div className="flex h-full flex-col items-start justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-col flex-grow items-start justify-start gap-4 max-w-xl rounded-lg p-4 w-full">
        <div className="space-y-2 mb-2">
          <h1 className="text-4xl font-medium">Generate a Folio</h1>
          <p className="text-sm text-gray-500">
            Generate a folio of your work based on your assets.
          </p>
        </div>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Audience</Label>
            <Input
              placeholder="e.g., Designer, Technical Team, Client"
              value={audience}
              onChange={(e) => setAudience(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Process and Roles</Label>
            <Textarea
              placeholder="Describe the process and roles you would like to highlight"
              value={process}
              onChange={(e) => setProcess(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label>Reading Time</Label>
            <Select
              value={readingTime.value}
              onValueChange={(value) =>
                setReadingTime(
                  readingTimes.find((t) => t.value === value) || readingTime
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a reading time" />
              </SelectTrigger>
              <SelectContent>
                {readingTimes.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    <div className="flex flex-row gap-2 w-full">
                      <div className="text-sm">{time.value}</div>
                      <div className="text-sm text-gray-400">{time.time}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="lg"
            className="w-full flex justify-between px-4 py-2 mt-8"
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
          >
            <div>{isLoading ? "Generating..." : "Generate"}</div>
            <Wand className="w-4 h-4" />
          </Button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}
