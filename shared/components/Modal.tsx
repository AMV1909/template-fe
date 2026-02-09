import type { ReactNode } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./Dialog";

interface Props {
    title: string;
    description?: string;
    footer?: ReactNode;
    content: ReactNode;
    children: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}

export function Modal({
    title,
    description,
    footer,
    content,
    children,
    open,
    onOpenChange,
}: Props) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent aria-describedby={description}>
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>

                    {description && (
                        <DialogDescription>{description}</DialogDescription>
                    )}
                </DialogHeader>

                <div className="mt-4 max-h-[80vh] overflow-y-auto">
                    {content}
                </div>

                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    );
}
