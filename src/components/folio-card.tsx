// using type folio from lib/types.ts
import { type Folio } from "@/lib/types";
import Link from "next/link";

const FolioCard: React.FC<{ folio: Folio }> = ({ folio }) => {
  // TODO this could be designed to be far more folio-looking

  return (
    <Link href={`/app/folios/${folio.uuid}`}>
      <div className="aspect-video w-full border border-gray-200 bg-gray-50 rounded-sm p-3 hover:bg-white transition-colors duration-200 space-y-4">
        <h2 className="text-md text-gray-900">{folio.title}</h2>

        <div className="flex flex-row gap-1 flex-wrap -ml-1">
          {folio.tags?.map((tag) => (
            <div
              key={tag}
              className="text-xs text-gray-800 font-light tracking-wide bg-gray-100 rounded-full px-2 py-0.5 lowercase"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default FolioCard;
