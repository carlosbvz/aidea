import "./globals.css";
import { Lato as latoFont } from "next/font/google";

const lato = latoFont({ weight: "400", subsets: ["latin"] });

export const metadata = {
  title: "AiDea",
  description: "Creating a better world with AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main className="container max-w-screen-xxl mx-auto px-4 my-8">
          {children}
        </main>
      </body>
    </html>
  );
}
