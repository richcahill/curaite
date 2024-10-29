"use client";
import React, { useEffect, useState } from "react";
import { firestore, auth } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import AssetComponent from "./asset";

import { type Asset } from "@/lib/types";
import { Input } from "./ui/input";

const AssetLibrary = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const user = auth.currentUser;

  useEffect(() => {
    // Reference to the 'assets' collection
    const assetsCollection = collection(
      firestore,
      `asset_library/${user?.uid}/files`
    );

    // Set up a real-time listener
    const unsubscribe = onSnapshot(
      assetsCollection,
      (snapshot) => {
        const assetsData = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            fileName: data.fileName,
            asset: data.asset,
            type: data.type,
            storageUrl: data.storageUrl,
            createdAt: data.createdAt,
          } as Asset;
        });

        // Sort assetsData by createdAt timestamp
        assetsData.sort((a, b) => {
          const aTime = a.createdAt ? a.createdAt.toDate().getTime() : 0;
          const bTime = b.createdAt ? b.createdAt.toDate().getTime() : 0;
          return aTime - bTime;
        });

        console.log(assetsData);
        setAssets(assetsData);
      },
      (error) => {
        console.error("Error fetching assets: ", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div className="space-y-4">
      {/* filters */}
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-xs"
        />

        <div className="flex items-center gap-x-2">
          <ToggleGroup
            type="single"
            value={filter}
            onValueChange={(value) => setFilter(value)}
          >
            <ToggleGroupItem value="all">All</ToggleGroupItem>
            <ToggleGroupItem value="images">Images</ToggleGroupItem>
            <ToggleGroupItem value="videos">Videos</ToggleGroupItem>
          </ToggleGroup>
        </div>
      </div>
      {/* assets */}
      {/* TODO proper search filter here and use the types for the type sorting */}
      <div className="w-full">
        <div className="columns-2 md:columns-3 gap-x-4">
          {assets
            .filter((asset) => {
              if (filter === "all") return true;
              return asset.type === filter;
            })
            .map((asset, index) => (
              <div key={index} className="mb-4 break-inside-avoid">
                <AssetComponent asset={asset} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default AssetLibrary;
