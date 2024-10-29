import { useRouter } from "next/router";

const FolioPage = () => {
  const router = useRouter();
  const { folio } = router.query; // Extract the slug from the URL

  // Render the page based on the slug
  return (
    <div>
      <h1>Folio: {folio}</h1>
      {/* Add more content here based on the folio */}
    </div>
  );
};

export default FolioPage;
