import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

function ChatHeader({ chat }: any) {
    return (
        <>
            <div className='bg-white px-4 w-full items-center border-b-[1px] flex gap-4 sticky top-[65px] h-16'>
                <Avatar>
                    <AvatarImage src={chat.brand.logo} className='overflow-visible object-cover' />
                    <AvatarFallback>L</AvatarFallback>
                </Avatar>
                <div>
                    <p className='text-sm'>{chat.brand.personName}</p>
                    <p className='text-xs'>{chat.brand.name}</p>
                </div>
            </div>
        </>
    )
}

export default ChatHeader
