import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChevronLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

function PaymentCard({ setVisible, user, setProgress }: any) {
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post('/api/connect-stripe');
            if (data.hasOwnProperty('errors')) {
                toast.error("Data not stored. Try again")
            }
            if (data.hasOwnProperty('success')) {
                toast.success("Stripe connected")
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
            <CardHeader >
                <div className='flex flex-row items-center gap-4'>
                    <CardTitle>Connect to Stripe</CardTitle>
                    {!user.stripeAccountId && <Button size={"sm"} disabled={isLoading} onClick={onSubmit}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Connect
                    </Button>}
                </div>
                <CardDescription>Stripe is used to manage payments. Connect now to start your journey with hyperedge</CardDescription>
            </CardHeader>
            <CardContent>
                {
                    user.stripeAccountId && <p>You have setted up the stripe account. Here is your account id <span className='font-bold'>{user.stripeAccountId}</span></p>
                }
                <div className='flex gap-1 justify-end'>
                    <Button onClick={() => setVisible("2")} disabled={isLoading} variant={'link'}><ChevronLeftIcon className='h-5 w-5' />Back</Button>

                </div>
            </CardContent>
        </Card>
    )
}

export default PaymentCard
