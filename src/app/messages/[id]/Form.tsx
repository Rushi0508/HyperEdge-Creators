'use client';

import {
    HiPaperAirplane,
    HiPhoto
} from "react-icons/hi2";
import {
    FieldValues,
    SubmitHandler,
    useForm
} from "react-hook-form";
import axios from "axios";
import MessageInput from "./MessageInput";
import toast from "react-hot-toast";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/app/libs/firebase";

const Form = ({ chat }: any) => {
    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setValue('message', '', { shouldValidate: true });
        if (data.message.length == 0) {
            toast.error("Enter message to send")
        }
        const user = await axios.get('/api/get-user');
        const messageCollection = collection(db, 'messages');
        await addDoc(messageCollection, {
            content: data.message,
            chatId: chat.id,
            senderId: user.data.user.id,
            createdAt: serverTimestamp()
        })
        // await axios.post('/api/add-message', {
        //     content: data.message,
        //     chatId: chat.id
        // })
    }
    const {
        register,
        handleSubmit,
        setValue,
        formState: {
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            message: ''
        }
    });

    return (
        <div
            className="
        fixed
        bottom-0
        py-4 
        px-4 
        bg-white 
        border-t 
        flex 
        items-center 
        gap-2 
        lg:gap-4 
        w-[75%]
      "
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex items-center gap-2 lg:gap-4 w-full"
            >
                <MessageInput
                    id="message"
                    register={register}
                    errors={errors}
                    required
                    placeholder="Write a message"
                />
                <button
                    type="submit"
                    className="
            rounded-full 
            p-2 
            bg-sky-500 
            cursor-pointer 
            hover:bg-sky-600 
            transition
          "
                >
                    <HiPaperAirplane
                        size={18}
                        className="text-white"
                    />
                </button>
            </form>
        </div>
    );
}

export default Form;