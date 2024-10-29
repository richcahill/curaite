// using type folio from lib/types.ts
import { type Folio } from "@/lib/types";

const FolioCard: React.FC<{ folio: Folio }> = ({ folio }) => {
  return (
    <div className="aspect-square w-full bg-gray-100 rounded-lg p-4">
      <p className="text-sm text-gray-500 font-light">{folio.title}</p>
    </div>
  );
};

export default FolioCard;
