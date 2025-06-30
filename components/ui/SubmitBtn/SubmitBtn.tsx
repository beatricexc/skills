'use client';
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="cursor-pointer text-white px-4 py-2 rounded bg-purple-600 hover:bg-purple-700"
    >
      {pending ? 'Saving...' : 'Submit'}
    </button>
  );
}
