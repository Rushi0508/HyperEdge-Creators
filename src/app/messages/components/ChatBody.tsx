import React, { useEffect, useRef, useState } from 'react'
import ChatHeader from './ChatHeader'
import axios from 'axios'
import MessageBox from './MessageBox'
import Form from './Form'

function ChatBody({ chat }: any) {
    const [messages, setMessages] = useState<any>(null)
    const bottomRef = useRef<HTMLDivElement>(null);
    const getMessages = async () => {
        const { data } = await axios.post('/api/get-messages', { chatId: chat.id });
        if (data.hasOwnProperty('success')) {
            setMessages(data.messages)
        }
    }
    useEffect(() => {
        bottomRef?.current?.scrollIntoView();
        if (chat) {
            getMessages()
        }
    }, [])
    return (
        <div>
            <ChatHeader chat={chat} />
            <div className="flex-1 overflow-y-auto">
                {messages?.map((message: any, i: any) => (
                    <MessageBox
                        isOwn={message.senderId == chat.creatorId ? true : false}
                        isLast={i === messages.length - 1}
                        key={message.id}
                        data={message}
                    />
                ))}
                <div className="pt-24" ref={bottomRef} />
            </div>
            <Form chat={chat} />
        </div>
    )
}

export default ChatBody
