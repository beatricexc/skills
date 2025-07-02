'use client';
import { useParams, useRouter } from 'next/navigation';

type SurveyNavigationProps = {
  surveyFlow: string[];
}

export function SurveyNavigation({ surveyFlow  }: SurveyNavigationProps) {
  const { categorySlug } = useParams();
  const router = useRouter();
  const currentIndex = surveyFlow.indexOf(categorySlug as string);
  const nextSlug = surveyFlow[currentIndex + 1];
  const prevSlug = surveyFlow[currentIndex - 1];

  const goToNextStep = () => {
    if (nextSlug) {
      router.push(`/user/survey/${nextSlug}`);
    } else {
      router.push('/user/survey'); // or show a completion screen
    }
  }

  const goToPrevStep = () => {
    if (prevSlug) {
      router.push(`/user/survey/${prevSlug}`);
    }
  }

  return (
    <div className="flex justify-between mb-8">
       <button
        onClick={goToPrevStep}
        disabled={!prevSlug}
        className="px-4 py-2 rounded cursor-pointer bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Back
      </button>
      <button
        onClick={goToNextStep}
        className="cursor-pointer px-4 py-2 rounded bg-[#00B5BE] text-white disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!nextSlug}
      >
        Next
      </button>
    </div>
  );
}
