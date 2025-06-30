'use client'
import { Trash2 } from 'lucide-react'
import { deleteCategory } from '@/app/actions/category'
import { Category } from '@prisma/client'

export function DeleteCategoryButton({ category }: { category: Category }) {
  return (
    <form action={deleteCategory} className="inline">
      <input type="hidden" name="categoryId" value={category.id} />
      <input type="hidden" name="categorySlug" value={category.slug} />
      <button
        type="submit"
        className="
          p-2 rounded-full
          bg-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.3)]
          text-[#234F8E] hover:text-[#192f5a]
          transition focus:outline-none focus:ring-2 focus:ring-[#234F8E]/50
        "
        aria-label="Delete category"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </form>
  )
}
