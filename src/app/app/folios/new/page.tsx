export default function NewFolio() {
  return (
    <div className="flex h-full flex-col items-center justify-start p-4 max-w-3xl mx-auto pb-20 gap-4 ">
      <div className="flex flex-col flex-grow items-center justify-center gap-4 bg-gray-50 rounded-lg p-4 w-full">
        <p className="text-sm text-gray-500 mono font-light">
          No projects found. Create a new project to get started.
        </p>
      </div>
    </div>
  );
}
