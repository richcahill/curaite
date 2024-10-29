"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { firestore, auth } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { type Folio } from "@/lib/types";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

enum AssetType {
  Image = "Image",
  Video = "Video",
  Document = "Document",
}

export default function FolioDetail({ folioUuid }: { folioUuid: string }) {
  const user = auth.currentUser;
  const [folio, setFolio] = useState<Folio | null>(null);

  useEffect(() => {
    const fetchFolio = async () => {
      try {
        const foliosRef = collection(firestore, `folios/${user?.uid}/folios`);
        const q = query(foliosRef, where("uuid", "==", folioUuid));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const folioData = querySnapshot.docs[0].data() as Folio;
          setFolio(folioData);
          console.log("Fetched folio data:", folioData);
        } else {
          console.warn("No folio found with the given UUID.");
        }
      } catch (error) {
        console.error("Error fetching folio:", error);
      }
    };
    fetchFolio();
  }, [user?.uid, folioUuid]);

  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-row gap-4 justify-between w-full items-center">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Link href="/app/folios">Folios</Link>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>{folio?.title}</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <div className="flex flex-row gap-2">
          <Button size="sm" variant="outline">
            Edit
          </Button>
          <Button size="sm">Share</Button>
        </div>
      </div>

      <div className="flex flex-col flex-grow items-start justify-center gap-2 bg-gray-50 rounded-lg p-4 w-full">
        <h2 className="text-2xl">{folio?.title}</h2>
        <div className="text-sm text-gray-500 max-w-prose">
          {folio?.description}
        </div>
        <div className="flex flex-row gap-2">
          {folio?.tags?.map((tag, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-full text-xs px-2 py-1 lowercase"
            >
              {tag}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-8">
          {folio?.assets?.map((item, index) => (
            <div key={index}>
              {item.type === AssetType.Image.toString() ? (
                <Image
                  src={item.storageUrl || ""}
                  alt={""}
                  width={300}
                  height={200}
                />
              ) : (
                <video
                  src={item.storageUrl || ""}
                  controls
                  title={""}
                  className="w-full"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
