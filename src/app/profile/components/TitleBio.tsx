import React from 'react'

function TitleBio({ user }: any) {
  return (
    <>
      <div>
        <div className='flex items-center justify-between'>
          <p className='text-xl font-semibold'>{user?.title}</p>
          <p className='font-semibold'>${user?.charges}/{(user?.unit)?.slice(4)}</p>
        </div>
        <p className='mt-2'>{user?.bio}</p>
      </div>
    </>
  )
}

export default TitleBio