'use client'
import { submitSkills } from '@/app/actions/userSkills';
import SubmitButton from '@/components/ui/SubmitBtn/SubmitBtn';
import { Prisma, UserSkill } from '@prisma/client';
import Link from "next/link";
import { useActionState } from 'react';
import { getLevel } from './utils';
import { LEVELS } from './data';
import { ChevronRight } from 'lucide-react';

type CategoryWithSkills = Prisma.CategoryGetPayload<{
  include: { skills: true };
}>;

export type SkillFormProps = {
  categoryWithSkills: CategoryWithSkills;
  userId: string;
  initialUserSkills: UserSkill[];
}

export default function SkillForm({ categoryWithSkills, userId, initialUserSkills }: SkillFormProps) {

  const [updateUserSkills, formAction] = useActionState<UserSkill[], FormData>(submitSkills, initialUserSkills);

  return (
    <div className="mx-auto px-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-8 text-center">{categoryWithSkills.name}</h3>
      <form className="block" action={formAction}>
        <input type="hidden" name="userId" value={userId} />
        <div className="grid grid-cols-7 justify-center">
          <div>&nbsp;</div>
          {LEVELS.map((level, index) => {
            return <p className='text-center' key={index}>{level.text}</p>
          })}
        </div>

        <div>
          {categoryWithSkills.skills.map((skill) => (
            <div key={skill.id} className="grid grid-cols-7 items-center rounded my-4">
              <label className="block">{skill.name}</label>

              {LEVELS.map((level) => (
                <label key={level.level} className="flex justify-center items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name={`${skill.id}`}
                    value={level.level}
                    defaultChecked={String(level.level) === getLevel(skill.id, updateUserSkills)}
                    className="peer hidden"
                  />
                  <div className="w-5 h-5 rounded-full border-0 bg-white flex items-center justify-center peer-checked:bg-purple-400">
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full scale-0 peer-checked:scale-100 transition-transform" />
                  </div>
                </label>
              ))}
            </div>
          ))}
        </div>
        <SubmitButton />
      </form>

      <Link
        className="inline-flex items-center mt-8 text-violet-600 underline underline-offset-2 hover:text-violet-700"
        href="/user/survey"
      >
        Go to main survey page
        <ChevronRight className="ml-1 w-4 h-4" />
      </Link>
    </div>
  );
}
