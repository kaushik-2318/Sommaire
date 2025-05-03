import { FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { MotionDiv } from "@/components/common/motion-wrapper"

export function Logo({ size = "default", className, href = "/" }) {
    const sizeClasses = {
        small: "h-6 w-6",
        default: "h-8 w-8",
        large: "h-16 w-16",
    }

    const textSizeClasses = {
        small: "text-sm",
        default: "text-xl",
        large: "text-3xl",
    }

    const content = (
        <div className={cn("flex items-center gap-2", className)}>
            <MotionDiv whileHover={{ rotate: 12 }} transition={{ type: "spring", stiffness: 300, damping: 10 }}>
                <FileText className={cn("text-rose-500", sizeClasses[size])} />
            </MotionDiv>
            <span className={cn("font-bold text-gray-900 dark:text-white", textSizeClasses[size])}>Sommaire</span>
        </div>
    )

    if (href) {
        return <Link href={href}>{content}</Link>
    }

    return content
}
