"use client";

import { auth, firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { type Folio } from "@/lib/types";
import FolioCard from "@/components/folio-card";

export default function Folios() {
  const user = auth.currentUser;
  const [folios, setFolios] = useState<Folio[]>([]);

  useEffect(() => {
    const fetchFolios = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, `projects/${user?.uid}`)
      );
      const folios = querySnapshot.docs.map((doc) => doc.data() as Folio);
      setFolios(folios);
    };
    fetchFolios();
  }, []);

  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-col flex-grow items-center justify-center gap-4 bg-gray-50 rounded-lg p-4 w-full">
        <div className="flex flex-col gap-2">
          {folios.length === 0 ? (
            <p className="text-sm text-gray-500 font-light p-8">
              No folios found. Create new to get started.
            </p>
          ) : (
            <div className="flex flex-col gap-2">
              {folios.map((folio) => (
                <FolioCard folio={folio} key={folio.uuid} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
