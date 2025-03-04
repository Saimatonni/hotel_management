"use client";

import { usePathname } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import Navbar from "./components/Navbar";
import "./globals.css";

export default function RootLayout({ children, modal }) {
  const pathname = usePathname();
  const hideNavbarRoutes = ["/auth/signin", "/auth/register"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {shouldShowNavbar && <Navbar />}
          {children}
          {modal}
        </SessionProvider>
      </body>
    </html>
  );
}
