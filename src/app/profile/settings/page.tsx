"use client"
import React, { useEffect, useState } from 'react'
import ProfessionalCard from './components/ProfessionalCard'
import PersonalCard from './components/PersonalCard'
import axios from 'axios';
import toast from 'react-hot-toast';
import Loading from './loading';
import { Progress } from '@/components/ui/progress';
import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion';
import PaymentCard from './components/PaymentCard';

function page() {
  const [dataLoading, setDataLoading] = useState(true);
  const [visible, setVisible] = useState("1");
  const [user, setUser] = useState(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await axios.get('/api/profile');
      if (data.hasOwnProperty('success') && data.user) {
        setUser(data.user)
        setProgress(calculateProfileCompletion(data.user))
      }
      else {
        toast.error('Unable to fetech user data')
      }
    }
    fetchUser()
    setDataLoading(false)
  }, [progress])

  if (dataLoading) return <Loading />

  return (
    <>
      <div className='w-[80%] m-auto flex items-center gap-2'>
        <span className='text-sm font-semibold'>{progress}%</span><Progress value={progress} />
      </div>
      <div className='mt-8'>
        {
          visible == "1" && <PersonalCard setVisible={setVisible} setProgress={setProgress} user={user} />
        }
        {
          visible == "2" && <ProfessionalCard setVisible={setVisible} setProgress={setProgress} user={user} />
        }
        {
          visible == "3" && <PaymentCard setVisible={setVisible} setProgress={setProgress} user={user} />
        }
      </div>
    </>
  )
}

export default page