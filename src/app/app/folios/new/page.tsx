"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { Wand } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewFolio() {
  // TODO:should use zod for validation here and make a custom hook for it
  const [title, setTitle] = useState("");
  const [audience, setAudience] = useState("");
  const [process, setProcess] = useState("");
  const [readingTime, setReadingTime] = useState("1");

  const readingTimes = [
    { value: "Short", time: "1 min" },
    { value: "Medium", time: "3 min" },
    { value: "Long", time: "5 min" },
    { value: "Very Long", time: "10 min" },
  ];

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
              value={readingTime}
              onValueChange={(value) => setReadingTime(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a reading time" />
              </SelectTrigger>
              <SelectContent>
                {readingTimes.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    <div className="flex flex-row gap-2 w-full">
                      <div className="text-sm font-medium ">{time.value}</div>
                      <div className="text-sm text-gray-400">{time.time}</div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            size="lg"
            className="w-full flex justify-between bg-violet-500 px-4 py-2 mt-8"
          >
            <div>Generate</div>
            <Wand className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
