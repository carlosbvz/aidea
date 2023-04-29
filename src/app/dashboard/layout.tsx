export const metadata = {
  title: "AiDea / Dashboard",
  description: "Creating a better world with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
