import PageHeading from "@/components/ui/page-heading";
import UploadFile from "@/components/upload-file";
import AssetLibrary from "@/components/asset-library";

export default function Assets() {
  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <PageHeading>Assets</PageHeading>
      <div className="flex flex-col flex-grow items-center justify-start gap-4 bg-gray-50 rounded-lg p-4 w-full">
        <UploadFile />
        <AssetLibrary />
      </div>
    </div>
  );
}
