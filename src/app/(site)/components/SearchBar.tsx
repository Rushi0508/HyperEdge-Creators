'use client'
import React, { useRef, useState } from 'react'

function SearchBar({ setCategories }: any) {
    const inputRef = useRef<any>(null);
    const handleSearch = () => {
        setCategories(inputRef.current.value)
    }
    return (
        <>
            <div className="flex">
                <button onClick={() => setCategories("All")} id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All categories
                </button>
                <div className="relative w-full">
                    <input ref={inputRef} type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 outline-none  rounded-e-lg border-s-gray-50 border-s-[1px] border border-gray-300 focus:ring-[#7c3aed] focus:border-[#7c3aed]" placeholder="Search categories (Ex- Fitness, Travel...)" required />
                    <button onClick={handleSearch} type="submit" className="absolute top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-[#7c3aed] rounded-e-lg border border-[#7c3aed] hover:bg-[#7c3aede1] dark:bg-[#7c3aed] dark:hover:bg-[#7c3aed] dark:focus:ring-[#7c3aed]">
                        <svg className="w-8 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Search</span>
                    </button>
                </div>
            </div >
        </>

    )
}

export default SearchBar