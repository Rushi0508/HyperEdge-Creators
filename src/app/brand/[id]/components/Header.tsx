import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Pencil1Icon, ReloadIcon, SewingPinIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function Header({ user, setUser }: any) {
    return (
        <div className='border-b-[1px] border-gray-300 p-5 flex justify-between'>
            <div className="flex gap-4 items-center">
                <div className='relative'>
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={user?.logo} className='object-cover overflow-visible' />
                        <AvatarFallback>{user?.name.substring(0, 1)}</AvatarFallback>
                    </Avatar>
                </div>
                <div>
                    <p className="font-semibold text-3xl">{user?.name}</p>
                    <span className="flex items-center mt-1 text-gray-500"><SewingPinIcon className='w-5 h-5' />{user?.state}, {user?.country}</span>
                </div>
            </div>
        </div>
    )
}

export default Header