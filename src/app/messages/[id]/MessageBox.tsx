'use client';
import clsx from "clsx";
import { format, isToday } from "date-fns";

const MessageBox = ({
    data, isLast, isOwn
}: any) => {
    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        'rounded-full py-2 px-3'
    );
    const date = new Date(data.createdAt.seconds * 1000 + data.createdAt.nanoseconds / 1000000).toLocaleString();
    return (
        <div className={container}>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-xs text-gray-400">
                        {format(date, isToday(date) ? 'p' : 'dd MMMM yy')}
                    </div>
                </div>
                <div className={message}>
                    <div>{data.content}</div>
                </div>
            </div>
        </div>
    );
}

export default MessageBox;