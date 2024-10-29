import { Timestamp } from "firebase/firestore";

type User = {
  email: string;
  uuid: string;
};

type Folio = {
  uuid: string;
  ownerUserId: string;
  collaborators?: string[];
  assets: Asset[];
  createdAt: Timestamp;
  updatedAt: Timestamp;
  title: string;
  description: string;
  readingTime?: number;
  tags?: string[];
  thumbnailUrl?: string;
  published: boolean;
};

type AssetType = "image/jpeg" | "image/png" | "image/gif" | "application/pdf";

type Asset = {
  id?: string;
  asset: string;
  type: AssetType;
  storageUrl: string;
  createdAt: Timestamp;
  tags?: string[];
  content?: string;
  detectedText?: string;
  llmDescription?: string;
};

type AssetLibrary = {
  uuid: string;
  ownerUserId: string;
  collaborators?: string[];
  assets: Asset[];
};

export type { User, Folio, Asset, AssetLibrary, AssetType };
