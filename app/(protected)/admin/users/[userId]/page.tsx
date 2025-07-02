import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function UserSkillsPage({ params }: any) {
  const user = await prisma.user.findUnique({
    where: { id: params.userId },
    include: {
      userSkills: {
        include: {
          skill: {
            include: { category: true },
          },
        },
      },
    },
  });

  if (!user) return <div className="text-red-500">User not found</div>;

  const grouped = user.userSkills.reduce((acc, userSkill) => {
    const category = userSkill.skill.category.name;

    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push({
      skill: userSkill.skill.name,
      level: userSkill.level,
    });

    return acc;
  }, {} as Record<string, { skill: string; level: number }[]>);

  return (
    <div className="max-w-4xl mx-auto p-6  backdrop-blur-sm bg-[rgba(244,244,244,0.6)]   border border-[rgba(244,244,244,0.3)] rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-[#0f2c54]">{user.name}`s Skills</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(grouped).map(([category, skills]) => (
          <div key={category} className="bg-gradient-to-br 
          from-white/30        /* White at 30% opacity, top-left */
          to-[#c6d8e5]/60         /* White at 20% opacity */
          backdrop-blur-sm
          border border-[rgba(244,244,244,0.3)]
          rounded-2xl shadow-lg hover:shadow-xl transition p-5">
            <h2 className="text-lg font-semibold text-[#234F8E] mb-3 border-b border-b-blue-200 pb-1">{category}</h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {skills.map(({ skill, level }) => (
                <li
                  key={skill}
                  className="flex justify-between items-center bg-white px-3 py-2 rounded border border-gray-200 hover:bg-violet-100 transition"
                >
                  <span>{skill}</span>
                  <span className="text-[#234F8E] font-medium">Level {level}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}