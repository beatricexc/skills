'use client';
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer text-white px-4 py-2 rounded bg-[#00B5BE]"
    >
      {pending ? 'Saving...' : 'Submit'}
    </button>
  );
}
