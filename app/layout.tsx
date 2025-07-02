import type { Metadata } from "next";
import SessionWrapper from "@/components/ui/SessionWrapper/SessionWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skill Survey",
  description: "IQVIA skill survey app"
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
