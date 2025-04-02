"use client";

import React from "react";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";

export default function LayoutWrapper({ children }: { readonly children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && <NavBar />} 
      {children}
    </>
  );
}
