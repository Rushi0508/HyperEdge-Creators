import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function PaymentCard({ setVisible, user, setProgress }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const [accountNo, setAccountNo] = useState("");
    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('/api/profile', { stripeAccountId: accountNo });
            if (data.hasOwnProperty('errors')) {
                toast.error("Data not stored. Try again")
            }
            if (data.hasOwnProperty('success')) {
                toast.success("Data Saved")
                setProgress(calculateProfileCompletion(data.user))
            }
        } catch (error) {
            return toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>Add your Stripe Account Number</CardDescription>
            </CardHeader>
            <CardContent>
                <Input value={user?.stripeAccountId} onChange={(e) => {
                    setAccountNo(e.target.value)
                }} placeholder='Stripe account number' className='mb-4' />
                <div className='flex gap-1 justify-end'>
                    <Button onClick={() => setVisible("1")} disabled={isLoading} variant={'link'}><ChevronLeftIcon className='h-5 w-5' /></Button>
                    <Button disabled={isLoading} onClick={onSubmit}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                    <Button disabled={isLoading} onClick={() => setVisible("3")} variant={'link'}>Next</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default PaymentCard
