import { Asset } from "@/lib/types";
import { auth, firestore } from "@/lib/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import Image from "next/image";
import { Trash2 } from "lucide-react";

const AssetComponent: React.FC<{ asset: Asset }> = ({ asset }) => {
  const user = auth.currentUser;

  const deleteAsset = async (id: string) => {
    if (!id) return;
    const docRef = doc(firestore, `asset_library/${user?.uid}/files/${id}`);
    await deleteDoc(docRef);
  };

  return (
    <div className="w-full group relative overflow-hidden rounded-md cursor-pointer">
      <div className="w-full h-full absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
      <button
        onClick={() => deleteAsset(asset.id ?? "")}
        className="w-8 h-8 hidden group-hover:flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 absolute top-0 right-0 cursor-pointer"
      >
        <Trash2 className="w-4 h-4 text-white" />
      </button>
      <Image
        src={asset.storageUrl}
        alt={asset.asset}
        width={800}
        height={600}
        layout="responsive"
        className="w-full object-cover"
      />
    </div>
  );
};

export default AssetComponent;
