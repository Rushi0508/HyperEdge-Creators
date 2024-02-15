import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

function Loading() {
  return (
    <div className="flex justify-center">
      <div className="space-y-5 w-full">
        <div className='header flex items-center gap-4'>
          <Skeleton color='red' className="h-[120px] w-[120px] rounded-full" />
          <div className='flex flex-col gap-2'>
            <Skeleton className="h-5 w-[500px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className='flex gap-4'>
          <Skeleton className="h-[50vh] w-[25%]" />
          <div className='w-[75%] flex flex-col gap-2'>
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading