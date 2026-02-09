// TP
import { Loader as Spinner } from "lucide-react";
import type { ComponentProps } from "react";

// BL
import { cn } from "@/shared/utils/cn";

interface LoaderProps extends ComponentProps<"div"> {
    size?: "sm" | "md" | "lg";
}

export function Loader({ className, size = "lg", ...props }: LoaderProps) {
    const sizeMap = {
        sm: "size-4",
        md: "size-8",
        lg: "size-12",
    };

    return (
        <div
            className={cn(
                "flex size-full items-center justify-center",
                className,
            )}
            {...props}
        >
            <Spinner className={cn(sizeMap[size], "animate-spin")} />
        </div>
    );
}
