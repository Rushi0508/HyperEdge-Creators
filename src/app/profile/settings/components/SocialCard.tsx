import { calculateProfileCompletion } from '@/app/actions/calculateProfileCompletion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ChevronLeftIcon, ReloadIcon } from '@radix-ui/react-icons'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaInstagram, FaYoutube } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { CiFacebook } from "react-icons/ci";
import { useForm } from 'react-hook-form'

function SocialCard({ setVisible, user, setProgress }: any) {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register, setValue, handleSubmit, formState: { errors }
    } = useForm();

    const onSubmit = async (body: any) => {
        try {
            setIsLoading(true);
            console.log(body);
            if (!body.instagram && !body.facebook && !body.twitter && !body.youtube) {
                return toast.error("Cannot submit blank");
            }
            const { data } = await axios.post('/api/profile', {
                socialIds: body
            });
            if (data.hasOwnProperty('errors')) {
                toast.error("Data not stored. Try again")
            }
            if (data.hasOwnProperty('success')) {
                toast.success("Socials Added")
                setProgress(calculateProfileCompletion(data.user))
            }
        } catch (error) {
            return toast.error("Something went wrong")
        }
        finally {
            setIsLoading(false)
        }
    }
    const socialMediaPlatforms = [
        {
            name: 'instagram',
            icon: <FaInstagram size={30} className='absolute mx-1' />,
            pattern: /^(https?:\/\/)?(www\.)?instagram\.com\/[\w.-]*\/?$/i,
            placeholder: 'https://www.instagram.com/username',
        },
        {
            name: 'twitter',
            icon: <RiTwitterXLine size={28} className='absolute mx-1' />,
            pattern: /^(https?:\/\/)?(www\.)?twitter.com\/.*$/i,
            placeholder: 'https://twitter.com/username',
        },
        {
            name: 'youtube',
            icon: <FaYoutube size={30} className='absolute mx-1' />,
            pattern: /^(https?:\/\/)?(www\.)?youtube.com\/.*$/i,
            placeholder: 'https://www.youtube.com/@username',
        },
        {
            name: 'facebook',
            icon: <CiFacebook size={30} className='absolute mx-1' />,
            pattern: /^(https?:\/\/)?(www\.)?facebook.com\/.*$/i,
            placeholder: 'https://www.facebook.com/username',
        },
    ];
    useEffect(() => {
        setValue('instagram', user?.socialIds?.instagram)
        setValue('twitter', user?.socialIds?.twitter)
        setValue('facebook', user?.socialIds?.facebook)
        setValue('youtube', user?.socialIds?.youtube)
    }, [])
    return (
        <Card>
            <CardHeader >
                <CardTitle>Connect to Social Accounts</CardTitle>
                <CardDescription>Add your social media accounts links</CardDescription>
            </CardHeader>
            <CardContent className='flex flex-col gap-4'>
                {
                    socialMediaPlatforms.map((platform: any) => (
                        <div>
                            <div className='flex items-center gap-2'>
                                {platform.icon}
                                <Input
                                    type="text"
                                    {...register(platform.name, { pattern: platform.pattern })}
                                    className='h-[35px] px-10'
                                    placeholder={platform.placeholder}
                                />
                            </div>
                            {errors[platform.name] && errors[platform.name]?.type === 'pattern' && (
                                <p className="mt-1 mb-0 text-red-600 text-sm">{platform.name.charAt(0).toUpperCase() + platform.name.slice(1)} link is not valid.</p>
                            )}

                        </div>

                    ))
                }


                <div className='flex gap-1 justify-end'>
                    <Button onClick={() => setVisible("2")} disabled={isLoading} variant={'link'}><ChevronLeftIcon className='h-5 w-5' /></Button>
                    <Button disabled={isLoading} onClick={handleSubmit(onSubmit)}>
                        {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
                        Save
                    </Button>
                    <Button disabled={isLoading} onClick={() => setVisible("4")} variant={'link'}>Next</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default SocialCard
