type User = {
  email: string;
  uuid: string;
};

type Project = {
  projectId: string;
};

type Asset = {
  asset: string;
  type: string;
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
