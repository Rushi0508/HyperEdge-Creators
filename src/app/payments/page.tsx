'use client'
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loading from "./loading"
import { format } from "date-fns"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export default function page() {

    const [pageLoading, setPageLoading] = useState(true);
    const [total, setTotal] = useState<any>(null);
    const [payments, setPayments] = useState<any>(null)

    const getTotal = (payments: any) => {
        let sum = 0;
        payments && payments.length > 0 && payments.forEach((payment: any) => {
            sum += payment.amount
        });
        setTotal(sum)
    }

    const fetchPayments = async () => {
        try {
            const { data } = await axios.get('/api/get-payments');
            if (data.hasOwnProperty('success')) {
                setPayments(data.payments);
                getTotal(data.payments);
            } else {
                toast.error("Cannot fetch payments");
            }
        } catch (e) {
            toast.error("Cannot fetch payments");
        }
        finally {
            setPageLoading(false);
        }
    }
    useEffect(() => {
        fetchPayments();
    }, [])
    return (
        <div className="my-4">
            <p className="text-center font-bold text-2xl mb-4">Payments</p>
            {
                pageLoading ? <Loading /> :
                    payments && <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Brand</TableHead>
                                <TableHead>Campaign</TableHead>
                                <TableHead className="text-right">Amount</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                payments.length > 0 ? payments.map((payment: any) => (
                                    <TableRow key={payment?.id}>
                                        <TableCell>{format(payment?.createdAt, 'dd-MM-yy')}</TableCell>
                                        <TableCell className="flex items-center gap-2">
                                            <Avatar>
                                                <AvatarImage className="overflow-visible object-cover" src={payment?.brand.logo} />
                                                <AvatarFallback>{payment?.brand.name.substring(0, 1)}</AvatarFallback>
                                            </Avatar>
                                            {payment?.brand.name}
                                        </TableCell>
                                        <TableCell>{payment?.collaboration[0]?.campaign.name}</TableCell>
                                        <TableCell className="text-right">${payment?.amount / 100}</TableCell>
                                    </TableRow>
                                ))
                                    :
                                    <p>No Payments found</p>
                            }
                        </TableBody>
                        {total && <TableFooter>
                            <TableRow className="font-bold">
                                <TableCell colSpan={3}>Total</TableCell>
                                <TableCell className="text-right">${total / 100}</TableCell>
                            </TableRow>
                        </TableFooter>}
                    </Table>}
        </div>
    )
}
