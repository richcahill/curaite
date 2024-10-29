"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Wand } from "lucide-react";

export default function NewFolio() {
  // TODO:should use zod for validation here and make a custom hook for it
  const [title, setTitle] = useState("");

  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-col flex-grow items-start justify-start gap-4 rounded-lg p-4 w-full">
        <h1 className="text-2xl font-bold">Create new folio</h1>

        <div className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Title</Label>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <Button
            size="lg"
            className="w-full flex justify-between bg-violet-500"
          >
            <div>Generate</div>
            <Wand className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
