import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center p-8 pb-20 gap-16 sm:p-20">
      <Button className="text-5xl font-semibold px-14 py-12 rounded-full">
        Create Portfolio
      </Button>
    </div>
  );
}
