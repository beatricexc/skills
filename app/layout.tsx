import type { Metadata } from "next";
import SessionWrapper from "@/components/ui/SessionWrapper/SessionWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth Example",
  description: "Next.js + Auth.js"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <SessionWrapper>
        <body>
          <main>
            {children}
          </main>
        </body>
      </SessionWrapper>
    </html>
  );
}
