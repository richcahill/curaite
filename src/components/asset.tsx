import { useState } from "react";
import { type Asset } from "@/lib/types";
import { auth, firestore } from "@/lib/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Trash2, Wand, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  //   DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AssetComponent: React.FC<{ asset: Asset }> = ({ asset }) => {
  const user = auth.currentUser;
  const [tags, setTags] = useState<string[]>(asset.tags ?? []);
  const [changed, setChanged] = useState(false);
  const [open, setOpen] = useState(false);

  const updateTags = async (tags: string[]) => {
    setTags(tags);
    setChanged(true);
  };

  const deleteAsset = async (id: string) => {
    if (!id) return;

    setOpen(false);
    const docRef = doc(firestore, `asset_library/${user?.uid}/files/${id}`);
    await deleteDoc(docRef);
  };

  const addTagsToAsset = async (tags: string[]) => {
    // use firestore to update the tags
    const docRef = doc(
      firestore,
      `asset_library/${user?.uid}/files/${asset.id}`
    );
    await updateDoc(docRef, { tags });
    setTags(tags);
    setChanged(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="w-full group relative overflow-hidden rounded-md cursor-pointer">
          <div className="pointer-events-none w-full h-full absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
          <button
            onClick={() => deleteAsset(asset.id ?? "")}
            className="w-8 h-8 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 absolute top-0 right-0 cursor-pointer"
          >
            <Trash2 className="w-4 h-4 text-white" />
          </button>
          <DialogTrigger>
            <Image
              src={asset.storageUrl}
              alt={asset.asset}
              width={800}
              height={600}
              layout="responsive"
              className="w-full object-cover"
            />
          </DialogTrigger>
        </div>
        <DialogContent className="max-h-[80vh] overflow-hidden p-2 max-w-4xl">
          <DialogHeader>
            <DialogTitle></DialogTitle>
          </DialogHeader>
          <div className="w-full h-full relative">
            <div className="w-full h-full relative flex items-start overflow-y-auto">
              <div className="flex-1 h-full">
                <Image
                  src={asset.storageUrl}
                  alt={asset.asset}
                  width={400}
                  height={600}
                  layout="responsive"
                  className="object-cover rounded-sm"
                />
              </div>
              <div className="flex flex-col justify-between h-full gap-2 p-3 w-96">
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex flex-col items-start gap-0">
                    <p className="text-xs text-gray-500">File Name</p>
                    <p className="text-sm text-gray-800">{asset.asset}</p>
                  </div>
                  <p className="text-sm text-gray-800"></p>
                  <div className="flex flex-col items-start gap-0">
                    <p className="text-xs text-gray-500">Created At</p>
                    <p className="text-sm text-gray-800">
                      {asset.createdAt.toDate().toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <p className="text-xs text-gray-500">Tags</p>
                    <div className="flex items-center gap-1 w-full">
                      <Input
                        type="text"
                        size={10}
                        placeholder="Add a tag"
                        value={tags.join(", ")}
                        onChange={(e) => updateTags(e.target.value.split(", "))}
                      />
                      {changed && (
                        <Button
                          variant="secondary"
                          className="flex items-center justify-between gap-2"
                          onClick={() => addTagsToAsset(tags)}
                        >
                          <div>Save</div>
                          <Save className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col items-start gap-1 w-full mt-3">
                    <p className="text-xs text-gray-500">Generated Metadata</p>
                    <div className="flex items-center gap-1 w-full">
                      <Button className="flex items-center justify-between gap-2 w-full">
                        <div>Scan</div>
                        <Wand className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 mt-4 justify-end flex-1">
                    <Button
                      variant="ghost"
                      className="flex items-center justify-between gap-2 hover:bg-red-500 hover:text-white"
                      onClick={() => deleteAsset(asset.id ?? "")}
                    >
                      <div>Delete</div>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AssetComponent;
