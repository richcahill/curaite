import FolioDetail from "./folio-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ folio: string }>;
}) {
  const { folio } = await params;

  return <FolioDetail folioUuid={folio} />;
}
