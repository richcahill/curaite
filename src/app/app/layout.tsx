import NavigationBar from "@/components/navigation-bar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`h-screen w-screen`}>
      <NavigationBar />
      <div className="flex-grow overflow-y-auto">{children}</div>
    </div>
  );
}
