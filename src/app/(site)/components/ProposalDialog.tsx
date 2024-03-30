import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ReloadIcon } from "@radix-ui/react-icons"
import axios from "axios"
import { useState } from "react"
import toast from "react-hot-toast"

export function ProposalDialog({ fetchDetails, openProposal, setOpenProposal, campaignId }: any) {
    const [proposedRate, setProposedRate] = useState<any>(null)
    const [message, setMessage] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = async () => {
        try {
            setIsLoading(true)
            if (!proposedRate || !message) {
                return toast.error("Enter all details")
            }
            if (proposedRate && isNaN(proposedRate)) {
                return toast.error("Enter valid charges")
            }
            const p = parseInt(proposedRate)
            const { data } = await axios.post('/api/make-proposal', {
                proposedRate: p, message: message, campaignId: campaignId
            })
            if (data.hasOwnProperty('success')) {
                toast.success("Proposal sent successfully")
                setOpenProposal(false)
                fetchDetails();
            } else {
                toast.error("Something went wrong")
            }
        } catch (e) {
            toast.error("Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Dialog open={openProposal} onOpenChange={() => setOpenProposal(!openProposal)}>
            <DialogContent className="w-3/4">
                <DialogHeader>
                    <DialogTitle>Make a Proposal</DialogTitle>
                    <DialogDescription>
                        Add the correct details and increase the chances of acceptance
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2">
                    <div>
                        <Label htmlFor="rate">Your Rate($)</Label>
                        <Input disabled={isLoading} value={proposedRate} onChange={(e) => setProposedRate(e.target.value)} id="rate" />
                    </div>
                    <div>
                        <Label htmlFor="message">Cover Letter</Label>
                        <Textarea disabled={isLoading} value={message} onChange={(e) => setMessage(e.target.value)} rows={4} id="message" />
                    </div>
                </div>
                <DialogFooter className="flex gap-2">
                    <Button disabled={isLoading} onClick={() => setOpenProposal(false)} variant={"outline"}>Cancel</Button>
                    <Button disabled={isLoading} onClick={handleSubmit} type="submit">
                        {isLoading && <ReloadIcon className="w-4 h-4 animate-spin mr-2" />}
                        Submit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
