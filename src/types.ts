export type Link = {
  id: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
};

export type LinkRepository = {
  save: (data: { originalUrl: string; shortCode: string }) => Promise<Link>;
};

export type CodeGenerator = {
  generate: () => string;
};
