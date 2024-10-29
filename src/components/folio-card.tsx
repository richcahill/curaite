// using type folio from lib/types.ts
import { type Folio } from "@/lib/types";

const FolioCard: React.FC<{ folio: Folio }> = ({ folio }) => {
  return <div>{folio.title}</div>;
};

export default FolioCard;
