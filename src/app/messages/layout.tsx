'use client'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import ChatList from './components/ChatList'
import toast from 'react-hot-toast';
import axios from 'axios';

function layout({ children }: { children: React.ReactNode }) {
    const [chats, setChats] = useState(null);
    // const [chat, setChat] = useState(null);
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
    }, [])
    return (
        <>
            <Navbar />
            <div className='max-w-screen-2xl mx-auto'>
                <div className='flex'>
                    <div className='w-[25%] relative'>
                        <ChatList pageLoading={pageLoading} chats={chats} />
                    </div>
                    <div className='w-[75%] relative'>
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

export default layout