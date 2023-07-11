"use client";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";

interface props {
    children: React.ReactNode;
  }
  

export default function Providers({ children }: props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{children}</>;
  }
  return <ThemeProvider attribute="class">{children}</ThemeProvider>;
}
