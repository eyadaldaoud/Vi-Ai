"use client";

import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/react";

const Client = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" enableSystem defaultTheme="system">
      {children}
      <Analytics />
    </ThemeProvider>
  );
};

export default Client;
