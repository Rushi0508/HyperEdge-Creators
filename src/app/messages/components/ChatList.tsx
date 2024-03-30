import React from 'react'
import Loading from '../loading'
import ChatBox from './ChatBox'

function ChatList({ chats, pageLoading }: any) {
    return (
        <div className='py-4 px-1 w-[25%] border-r-[1px] bg-white overflow-auto fixed left-0 top-[60px] bottom-0 no-scrollbar'>
            <p className='text-xl font-semibold tracking-wide px-4 mb-2'>Messages</p>
            {
                pageLoading ?
                    <Loading /> :
                    <div>
                        {
                            chats && chats?.length == 0 ?
                                <p>No Chats found</p> :
                                chats?.map((c: any) => (
                                    <>
                                        <ChatBox chat={c} /><hr />
                                    </>
                                ))
                        }
                    </div>
            }
        </div>
    )
}

export default ChatList
