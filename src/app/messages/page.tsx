'use client'
import React, { useEffect, useState } from 'react'
import ChatList from './components/ChatList'
import Loading from './loading';
import toast from 'react-hot-toast';
import axios from 'axios';
import ChatBody from './components/ChatBody';
import EmptyState from './components/EmptyState';

function page() {
    const [chats, setChats] = useState(null);
    const [chat, setChat] = useState(null);
    const [pageLoading, setPageLoading] = useState(true)
    const getUserChats = async () => {
        try {
            const { data } = await axios.get('/api/find-user-chats');
            setChats(data.chats);
        } catch (e) {
            toast.error("Cannot load chats");
        } finally {
            setPageLoading(false)
        }
    }
    useEffect(() => {
        getUserChats();
    })
    return (
        <div className='flex'>
            <div className='w-[25%] border-r-[1px] border-gray-100 relative'>
                <ChatList setChat={setChat} pageLoading={pageLoading} chats={chats} />
            </div>
            <div className='w-[75%]'>
                {
                    chat ? <ChatBody chat={chat} /> :
                        <EmptyState />
                }
            </div>
        </div>
    )
}

export default page
