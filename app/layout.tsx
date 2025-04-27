import Wrapper from "./Wrapper";
import Navbar from "./Components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vi-Ai",
  description: "Your Ai assistant and image generator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} dark:bg-black bg-white`}>
        <Wrapper>
          <Navbar>{children}</Navbar>
        </Wrapper>
      </body>
    </html>
  );
}
