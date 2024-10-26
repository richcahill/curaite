type User = {
  email: string;
  uuid: string;
};

type Project = {
  projectId: string;
  // TODO: add more project metadata
};

type AssetType = "image" | "video" | "text" | "pdf" | "url" | "blogPost";

type Asset = {
  asset: string;
  type: AssetType;
  storageUrl: string;
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

export type { User, Project, Asset, AssetLibrary };
