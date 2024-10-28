"use client";
import React, { useEffect, useState } from "react";
import { firestore, auth } from "@/lib/firebase";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { type Asset } from "@/lib/types";

const AssetLibrary = () => {
  const [assets, setAssets] = useState<Asset[]>([]);
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

    // Clean up the listener on component unmount
    return () => unsubscribe();
  }, []);

  const deleteAsset = async (id: string) => {
    if (!id) return;
    const docRef = doc(firestore, `asset_library/${user?.uid}/files/${id}`);
    await deleteDoc(docRef);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[0, 1, 2].map((col) => (
          <div key={col} className="grid gap-4">
            {assets
              .filter((_, index) => index % 3 === col)
              .map((asset, index) => (
                <div
                  key={index}
                  className="w-full group relative overflow-hidden rounded-md"
                >
                  <div className="w-full h-full absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                  <button
                    onClick={() => deleteAsset(asset.id ?? "")}
                    className="w-8 h-8 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 absolute top-2 right-2 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                  <Image
                    src={asset.storageUrl}
                    alt={asset.asset}
                    width={800}
                    height={600}
                    layout="responsive"
                    className="w-full object-cover"
                  />
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssetLibrary;
