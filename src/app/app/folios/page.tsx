"use client";

import { auth, firestore } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { type Folio } from "@/lib/types";
import FolioCard from "@/components/folio-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function Folios() {
  const user = auth.currentUser;
  const [folios, setFolios] = useState<Folio[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchFolios = async () => {
      const querySnapshot = await getDocs(
        collection(firestore, `folios/${user?.uid}/folios`)
      );
      const folios = querySnapshot.docs.map((doc) => doc.data() as Folio);
      setFolios(folios);
    };
    fetchFolios();
  }, [user?.uid]);

  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-col flex-grow items-center justify-center gap-6 bg-gray-50 rounded-lg p-4 w-full">
        <div className="w-full flex justify-between items-center">
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-xs"
          />
          <Link href="/app/folios/new">
            <Button>
              <div>Create new</div> <Plus className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-2 w-full">
          {folios.length === 0 ? (
            <p className="text-sm text-gray-500 font-light p-8">
              No folios found. Create new to get started.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-2 w-full">
              {folios
                .filter((folio) =>
                  folio.title.toLowerCase().includes(search.toLowerCase())
                )
                .map((folio) => (
                  <FolioCard folio={folio} key={folio.uuid} />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
