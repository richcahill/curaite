"use client";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { firestore, auth } from "@/lib/firebase";
import { getDoc } from "firebase/firestore";
import { type Folio } from "@/lib/types";
import { doc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function FolioDetail({ folioUuid }: { folioUuid: string }) {
  const user = auth.currentUser;
  const [folio, setFolio] = useState<Folio | null>(null);

  useEffect(() => {
    const fetchFolio = async () => {
      const folioDoc = await getDoc(
        doc(firestore, `folios/${user?.uid}/folios/${folioUuid}`)
      );
      const folioData = folioDoc.data() as Folio;
      setFolio(folioData);
    };
    fetchFolio();
  }, [user?.uid, folioUuid]);

  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-row gap-4 justify-between w-full">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/app/folios">Folios</BreadcrumbLink>
              <BreadcrumbSeparator />
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbLink href={`/app/folios/${folio?.uuid}`}>
                {folio?.title}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-col flex-grow items-center justify-center gap-6 bg-gray-50 rounded-lg p-4 w-full">
        hello world
      </div>
    </div>
  );
}
