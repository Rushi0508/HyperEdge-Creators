"use client";
import React, { useEffect, useState } from "react";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import TitleBio from "./components/TitleBio";
import Collaborations from "./components/Collaborations";
import Loading from "./loading";
import toast from "react-hot-toast";
import NotFound from "@/app/not-found";

function page({ params }: { params: { id: string } }) {
    const [dataLoading, setDataLoading] = useState(true)
    const [user, setUser] = useState<any>(null)

    const fetchBrand = async () => {
        try {
            const { data } = await axios.post(`/api/brand/${params.id}`, { id: params.id })
            if (data.hasOwnProperty('success') && data.brand) {
                setUser(data.brand);
            } else {
                setUser("")
            }
        } catch (error) {
            toast.error("Something went wrong");
        } finally {
            setDataLoading(false);
        }
    }

    useEffect(() => {
        fetchBrand();
    }, [])

    if (user == "") return <NotFound />
    else if (dataLoading) return <Loading />
    return (
        <>
            <div className="border-[1px] border-gray-300 rounded-2xl">
                <Header user={user} setUser={setUser} />
                <div className="flex">
                    <div className="w-[30%] border-r-[1px] border-gray-300">
                        <Sidebar user={user} />
                    </div>
                    <div className="w-[70%]">
                        <div className='py-5 px-10 border-b-[1px] border-gray-300'>
                            <TitleBio user={user} />
                        </div>
                        <div className='py-5 px-10 border-b-[1px] border-gray-300'>
                            <Collaborations user={user} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default page;
