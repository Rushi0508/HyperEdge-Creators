import { Skeleton } from "@/components/ui/skeleton"

function Loading() {
    return (
        <div className="flex flex-col space-y-3">
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
            <Skeleton className="h-[100px] w-full rounded-xl" />
            <div className="space-y-2">
                <Skeleton className="h-4 w-[80%]" />
                <Skeleton className="h-4 w-[200px]" />
            </div>
        </div>
    )
}

export default Loading