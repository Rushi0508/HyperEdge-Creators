import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import React from 'react'

function ChatBox({ chat, setChat }: any) {
    return (
        <div onClick={() => setChat(chat)} className='cursor-pointer py-3 px-4 rounded-md hover:bg-gray-100 flex items-center gap-4'>
            <Avatar>
                <AvatarImage src={chat.brand.logo} className='overflow-visible object-cover' />
                <AvatarFallback>L</AvatarFallback>
            </Avatar>
            <div>
                <p className='text-sm'>{chat.brand.personName}</p>
                <p className='text-xs'>{chat.brand.name}</p>
            </div>
        </div>
    )
}

export default ChatBox
