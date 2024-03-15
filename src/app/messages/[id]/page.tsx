'use client'
import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader'
import axios from 'axios'
import MessageBox from './MessageBox'
import Form from './Form'
import Loading from '../loading'
import NotFound from '@/app/not-found'
import { db } from '@/app/libs/firebase'
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore'

function ChatBody({ params }: { params: { id: string } }) {
    const [chat, setChat] = useState<any>(JSON.parse(localStorage.getItem('chat')!))
    const [messages, setMessages] = useState<any>(null)
    const bottomRef = useRef<HTMLDivElement>(null);
    const [pageLoading, setPageLoading] = useState(true);
    const getMessages = async () => {
        try {
            if (!chat) {
                await fetchChat()
            }
            const unsubscribe = await onSnapshot(query(collection(db, 'messages'), where(
                'chatId', '==', params.id
            ), orderBy('createdAt', "asc")), snapshot => {
                const messagesData = snapshot.docs.map((doc) => ({
                    ...doc.data()
                }));
                console.log(messagesData)
                setMessages(messagesData);
            })
            return unsubscribe;
            // const { data } = await axios.post('/api/get-messages', { chatId: params.id });
            // if (data.hasOwnProperty('success')) {
            //     setMessages(data.messages)
            // }
        } catch (e) {
            console.log(e);
        } finally {
            setPageLoading(false);
        }
    }
    useEffect(() => {
        getMessages()
        bottomRef?.current?.scrollIntoView()
    }, [])

    useEffect(() => {
        bottomRef?.current?.scrollIntoView()
    }, [messages])

    const fetchChat = async () => {
        const { data } = await axios.post('/api/find-chat', { chatId: params.id });
        if (data.hasOwnProperty('chat')) {
            setChat(data.chat);
        }
    }
    if (!pageLoading && chat?.id !== params.id) {
        return <NotFound />
    }
    return (
        pageLoading ? <Loading /> :
            <div>
                <ChatHeader chat={chat} />
                <div className="flex-1 overflow-y-auto">
                    {
                        messages?.map((message: any, i: any) => (
                            <MessageBox
                                isOwn={message.senderId == chat?.creatorId ? true : false}
                                isLast={i === messages.length - 1}
                                key={message.id}
                                data={message}
                            />
                        ))
                    }
                    <div className="pt-24" ref={bottomRef} />
                </div>
                <Form chat={chat} />
            </div>
    )
}

export default ChatBody
