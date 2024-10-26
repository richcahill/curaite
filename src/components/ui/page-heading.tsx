import React from "react";

interface PageHeadingProps {
  children: React.ReactNode;
}

const PageHeading: React.FC<PageHeadingProps> = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 border-b-2 border-gray-100 pb-4">
      <h1 className="text-3xl font-semibold">{children}</h1>
    </div>
  );
};

export default PageHeading;
