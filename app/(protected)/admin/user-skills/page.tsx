// app/(protected)/admin/user-skills/page.tsx
import { prisma } from "@/lib/prisma";
import Filters from "./components/Filters/Filters";

export const dynamic = 'force-dynamic';

export default async function UserSkillsPage() {
  const categories = await prisma.category.findMany();

  return (
    <div className="min-h-[calc(100vh-4rem)] p-6">
      {/* Frosted-glass wrapper */}
      <div
        className="
          relative z-10
          backdrop-blur-sm bg-[rgba(244,244,244,0.6)]
          border border-[rgba(244,244,244,0.3)]
          rounded-2xl
          max-w-5xl mx-auto
          p-6 sm:p-8
          space-y-6
        "
      >
        <h1 className="text-3xl font-semibold text-[#234F8E]">Browse Skills</h1>

        <Filters propsCategories={categories} />
      </div>
    </div>
  );
}
