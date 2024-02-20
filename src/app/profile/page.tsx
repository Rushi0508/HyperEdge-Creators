"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React, { useEffect, useState } from "react";
import getCurrentUser from "../actions/getCurrentUser";
import { Button } from "@/components/ui/button";
import { Pencil1Icon } from "@radix-ui/react-icons";
import Link from "next/link";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import axios from "axios";
import TitleBio from "./components/TitleBio";
import Collaborations from "./components/Collaborations";
import Loading from "./loading";

function page() {
  const [dataLoading, setDataLoading] = useState(true)
  useEffect(()=>{
    (async function fetchUser(){
      const {data} = await axios.get('/api/profile');
      setUser(data.user)
      setDataLoading(false)
    })();
  }, [])
  const [user, setUser] = useState(null)
  if(dataLoading) return <Loading/>
  return (
    <>
    <div className="border-[1px] border-gray-300 rounded-2xl">
      <Header user={user} setUser={setUser}/>
      <div className="flex">
        <div className="w-[30%] border-r-[1px] border-gray-300">
          <Sidebar user={user}/>
        </div>
        <div className="w-[70%]">
          <div className='py-5 px-10 border-b-[1px] border-gray-300'>
            <TitleBio user={user}/>
          </div>
          <div className='py-5 px-10 border-b-[1px] border-gray-300'>
            <Collaborations user={user}/>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default page;
