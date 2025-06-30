import { Category, Skill } from '@prisma/client';
import { GlassCard } from '@/components/ui/GlassCard/GlassCard';
import CategoryForm from '../AddNewSkillForm/AddNewSkillForm';
import { DeleteCategoryButton } from '../DeleteCategoryButton/DeleteCategoryButton';
import EditableSkillRow from './components/Forms/EditableSkillForm';

interface Props {
  category: Category;
  name: string;
  slug: string;
  skills: Skill[];
}

export default function CategoryCard({ category, name, skills }: Props) {
  return (
    <GlassCard className="flex flex-col justify-between p-6" title={name}>
      {/* Header actions */}
      <div className="flex justify-end">
        <DeleteCategoryButton category={category} />
      </div>

      {/* Skills list */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 font-medium mb-2">Skills</p>
        {skills.length > 0 ? (
          <div className="space-y-2">
            {skills.map((skill) => (
              <EditableSkillRow key={skill.id} skill={skill} />
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">No skills yet</p>
        )}
      </div>

      {/* Add skill form */}
      <CategoryForm category={category} />
    </GlassCard>
  );
}
