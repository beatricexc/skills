'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

type UserSkillsPaginationProps = {
    currentPage?: number;
    pageSize?: number;
    totalItems?: number;
    doSearch: (params: URLSearchParams) => void;
}

export default function UserSkillsPagination({ currentPage = 1, pageSize = 5, totalItems, doSearch }: UserSkillsPaginationProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [inputPage, setInputPage] = useState(currentPage);
  const [pageSizeInput, setPageSizeInput]  = useState(pageSize);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Clone the current search params
    const params = new URLSearchParams(searchParams.toString())

    // Set the new page value
    params.set('page', inputPage.toString())
    params.set('pageSize', pageSizeInput.toString())
    // Push the updated URL with all preserved params
    router.push(`?${params.toString()}`)
    router.push(`?${params.toString()}`)

    doSearch(params);
  }

  return (
      <div>
          <form onSubmit={handleSubmit} className="flex gap-2 mt-10 items-center justify-center">
              <label className=' text-[#234F8E]' htmlFor="pageInput">Page:</label>
              <input
                  id="pageInput"
                  type="number"
                  min={1}
                  value={inputPage}
                  onChange={(e) => setInputPage(Number(e.target.value))}
                  className="px-2 py-1 w-20  text-sm rounded-lg
                              bg-[rgba(255,255,255,0.2)] backdrop-blur-sm
                              border border-[rgba(244,244,244,0.3)]
                              focus:outline-none focus:ring-2 focus:ring-[#A1DAD7] focus:border-transparent
                              transition"
              />

              <label className=' text-[#234F8E]' htmlFor="pageInput">Page size:</label>
              <input
                  id="pageSize"
                  type="number"
                  min={2}
                  value={pageSizeInput}
                  onChange={(e) => setPageSizeInput(Number(e.target.value))}
                  className="px-2 py-1 w-20  text-sm rounded-lg
                  bg-[rgba(255,255,255,0.2)] backdrop-blur-sm
                  border border-[rgba(244,244,244,0.3)]
                  focus:outline-none focus:ring-2 focus:ring-[#A1DAD7] focus:border-transparent
                  transition"
              />
              <button type="submit" className="cursor-pointer bg-[#00BFB3] hover:bg-[#68aaa6] text-white px-3 py-1 rounded">
                  Search
              </button>
          </form>
          <div className='flex justify-center mt-5'>
              {totalItems && totalItems > 0 && (
                <div className="justify-center items-center text-sm text-gray-600 bg-gray-50 border border-gray-200 px-4 py-2 rounded shadow-sm inline-block">
                  <span className="font-medium text-[#234F8E]">
                    Total Pages: {Math.ceil(totalItems / pageSize)}
                  </span>{' '}
                  <span className="ml-1 text-gray-500">
                    ({totalItems} total users)
                  </span>
                </div>
              )}
          </div>
      </div>
  )
}