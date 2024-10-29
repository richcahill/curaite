// components/FileUpload.tsx
"use client";

import React, { useState, useRef } from "react";
import { Progress } from "@/components/ui/progress";
import { storage, firestore, auth } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { AssetType, type Asset } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

import {
  ref,
  uploadBytesResumable,
  getDownloadURL,
  UploadTaskSnapshot,
} from "firebase/storage";

const FileUpload = () => {
  const user = auth.currentUser;
  const [progress, setProgress] = useState<number>(0);
  const [error, setError] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleBoxClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileUpload = (file: File): void => {
    if (!file) {
      setError("No file selected");
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
    ];
    if (!allowedTypes.includes(file.type)) {
      setError("Invalid file type");
      return;
    }
    const maxSize = 20 * 1024 * 1024; // 20MB
    if (file.size > maxSize) {
      setError("File size exceeds limit");
      return;
    }

    setError("");
    const userId = user?.uid;

    // Create a storage reference
    const storageRef = ref(storage, `uploads/${userId}/${file.name}`);

    // Start the file upload
    const uploadTask = uploadBytesResumable(storageRef, file);

    // Monitor the upload progress
    uploadTask.on(
      "state_changed",
      (snapshot: UploadTaskSnapshot) => {
        const progressPercent =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
      },
      (error) => {
        // Handle errors
        setError(error.message);
      },
      async () => {
        // Upload completed successfully
        const url = await getDownloadURL(uploadTask.snapshot.ref);

        // use the Asset type to store the file metadata
        // Prepare metadata to store in Firestore
        const fileMetadata: Asset = {
          id: uuidv4(),
          asset: file.name,
          type: file.type as AssetType,
          storageUrl: url,
          createdAt: Timestamp.now(),
        };

        try {
          // Add metadata to Firestore
          const docRef = await addDoc(
            collection(firestore, `asset_library/${user?.uid}/files`),
            fileMetadata
          );
          console.log("Document written with ID: ", docRef.id);
          setProgress(0); // Reset progress
        } catch (e) {
          console.error("Error adding document: ", e);
          setError("Failed to save file metadata to Firestore.");
        }
      }
    );
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="w-full flex flex-col items-stretch justify-center gap-2">
      <div
        onClick={handleBoxClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border border-dashed border-gray-300 rounded-md p-4 h-24 flex flex-col items-center justify-center text-center text-sm text-gray-500 cursor-pointer"
      >
        {progress > 0 ? (
          <Progress value={progress} max={100} className="max-w-56" />
        ) : (
          <>
            <p>Drag and drop or click to select files</p>
            <div className="text-center">{error && <p>Error: {error}</p>}</div>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => handleFileUpload(e.target.files?.[0] as File)}
        />
      </div>
    </div>
  );
};

export default FileUpload;
