import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Link from 'next/link'

function Collaborations({ user }: any) {
    return (
        <>
            <div>
                <p className='text-xl flex items-baseline gap-2 font-semibold'>
                    Collaborations
                </p>
                {user?.collaborations && user?.collaborations.length > 0 ?
                    <>
                        <Carousel className='mt-3 whitespace-nowrap mx-4'>
                            {user.collaborations.map((c: any, index: any) => (
                                <CarouselContent>
                                    <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
                                        <Card>
                                            <CardHeader className='flex gap-4 flex-row'>
                                                <Avatar className="w-16 h-16">
                                                    <AvatarImage src={c.brand.logo} className='object-cover overflow-visible' />
                                                    <AvatarFallback>CN</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <CardTitle>
                                                        {c.campaign.name.length > 30 ? c.campaign.name.substring(0, 30) + '...' : c.campaign.name}
                                                    </CardTitle>
                                                    <CardDescription>for <Link className='hover:underline' href={`/brand/${c.brand.id}`}>{c.brand.name}</Link></CardDescription>
                                                </div>
                                            </CardHeader>
                                        </Card>
                                    </CarouselItem>
                                </CarouselContent>
                            ))}
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                    </>
                    :
                    <p className='text-gray-400'>No Collaborations yet.</p>
                }
            </div>
        </>
    )
}

export default Collaborations