import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useRouter } from 'next/navigation'
import React from 'react'

function ChatBox({ chat }: any) {
    const router = useRouter();
    return (
        <div onClick={async () => {
            await localStorage.setItem('chat', JSON.stringify(chat));
            router.push(`/messages/${chat?.id}`)
        }} className='cursor-pointer py-3 px-4 rounded-md hover:bg-gray-100 flex items-center gap-4'>
            <Avatar>
                <AvatarImage src={chat.brand.logo} className='overflow-visible object-cover' />
                <AvatarFallback>{chat.brand.name.substring(0, 1)}</AvatarFallback>
            </Avatar>
            <div>
                <p className='text-sm'>{chat.brand.personName}</p>
                <p className='text-xs'>{chat.brand.name}</p>
            </div>
        </div>
    )
}

export default ChatBox
