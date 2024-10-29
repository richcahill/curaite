// using type folio from lib/types.ts
import { type Folio } from "@/lib/types";
import Link from "next/link";

const FolioCard: React.FC<{ folio: Folio }> = ({ folio }) => {
  console.log(folio.createdAt);

  return (
    <Link href={`/app/folios/${folio.uuid}`}>
      <div className="aspect-square w-full border border-gray-200 bg-white rounded-sm p-4">
        <h2 className="text-md text-gray-900">{folio.title}</h2>
      </div>
    </Link>
  );
};

export default FolioCard;
