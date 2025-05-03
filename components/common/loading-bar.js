"use client"

import { useEffect, useState } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { MotionDiv } from "@/components/common/motion-wrapper"

export default function LoadingBar() {
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0)
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        let interval

        // Reset loading state when route changes
        setIsLoading(true)
        setProgress(0)

        // Simulate progress
        interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval)
                    setTimeout(() => setIsLoading(false), 200)
                    return 100
                }

                // Accelerate progress as it gets closer to 100%
                const increment = prev < 30 ? 5 : prev < 60 ? 3 : prev < 90 ? 1 : 0.5
                return Math.min(prev + increment, 100)
            })
        }, 100)

        return () => {
            clearInterval(interval)
        }
    }, [pathname, searchParams])

    if (!isLoading) return null

    return (
        <div className="fixed top-0 left-0 right-0 z-50 h-1">
            <MotionDiv
                className="h-full bg-linear-to-r from-rose-500 via-rose-400 to-rose-500 bg-[length:200%_100%]"
                style={{ width: `${progress}%` }}
                animate={{
                    backgroundPosition: ["0% 0%", "100% 0%"],
                    transition: {
                        duration: 1.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                    },
                }}
            />
        </div>
    )
}
