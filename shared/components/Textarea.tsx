"use client";

import { useId, useState, type ChangeEvent, type ComponentProps } from "react";
import { cn } from "@/shared/utils/cn";

interface Props extends ComponentProps<"textarea"> {
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
    error?: string;
}

export function Textarea({
    className,
    label,
    labelClassName,
    containerClassName,
    error,
    onChange,
    maxLength,
    ...props
}: Props) {
    const id = useId();

    const [text, setText] = useState(
        String(props.defaultValue || props.value || ""),
    );

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value);
        onChange?.(e);
    };

    return (
        <div className={cn("flex flex-col gap-1", containerClassName)}>
            {label && (
                <label
                    htmlFor={id}
                    className={cn("text-sm font-semibold", labelClassName)}
                >
                    {label}
                </label>
            )}

            <textarea
                id={id}
                data-slot="textarea"
                className={cn(
                    "border-input placeholder:text-muted-foreground focus-visible:border-primary aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full resize-none rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:border-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    error &&
                        "border-destructive focus-visible:border-destructive",
                    className,
                )}
                value={text}
                onChange={handleChange}
                maxLength={maxLength}
                {...props}
            />

            <div className="flex items-center justify-between gap-2">
                {error && (
                    <span className="text-destructive text-sm">{error}</span>
                )}

                {maxLength && (
                    <span className="text-muted-foreground text-sm">
                        {text.length}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    );
}
