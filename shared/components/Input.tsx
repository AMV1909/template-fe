import { useId, useState, type ComponentProps } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@/shared/utils/cn";
import { Button } from "./Button";

interface Props extends ComponentProps<"input"> {
    label?: string;
    labelClassName?: string;
    containerClassName?: string;
    error?: string;
    success?: string;
    showForgotPassword?: boolean;
}

export function Input({
    label,
    className,
    type,
    labelClassName,
    containerClassName,
    required,
    error,
    success,
    showForgotPassword,
    ...props
}: Props) {
    const id = useId();
    const t = useTranslations("LoginPage");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className={cn("relative flex flex-col gap-1", containerClassName)}>
            <label
                htmlFor={id}
                className={cn(
                    "text-sm font-semibold",
                    labelClassName,
                    type === "radio" && "text-base",
                )}
            >
                {label}
                {required && <span className="text-red-500"> *</span>}
            </label>

            <input
                id={id}
                type={type === "password" && showPassword ? "text" : type}
                data-slot="input"
                className={cn(
                    "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                    "focus-visible:border-primary focus-visible:border-2",
                    "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                    type === "file" && "cursor-pointer",
                    error &&
                        "border-destructive focus-visible:border-destructive",
                    success &&
                        "border-green-500 focus-visible:border-green-500",
                    type === "password" && "pr-10",
                    className,
                )}
                {...props}
            />

            {type === "password" && (
                <Button
                    type="button"
                    size="icon"
                    variant="ghost"
                    Icon={showPassword ? EyeOff : Eye}
                    onClick={() => setShowPassword(!showPassword)}
                    className={cn(
                        "absolute right-2 bottom-1 transition-none",
                        (error || success || showForgotPassword) && "bottom-6",
                    )}
                />
            )}

            <div
                className={cn(
                    "flex items-center justify-end gap-2",
                    success && "justify-start",
                    error && "justify-between",
                )}
            >
                {success && (
                    <span className="text-sm text-green-500">{success}</span>
                )}

                {error && (
                    <span className="text-destructive text-sm">{error}</span>
                )}

                {showForgotPassword && (
                    <Link
                        href="/reset-password"
                        className="text-sm font-semibold text-gray-500 hover:underline"
                    >
                        {t("forgot-password")}
                    </Link>
                )}
            </div>
        </div>
    );
}
