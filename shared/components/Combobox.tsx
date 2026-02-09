"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";

import { cn } from "../utils/cn";
import { Button } from "./Button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "./Command";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

interface BaseProps {
    label?: string;
    placeholder?: string;
    searchPlaceholder?: string;
    options: { label: string; value: string | number }[];
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    className?: string;
    required?: boolean;
}

interface SingleValueProps extends BaseProps {
    isMultiple: false;
    value?: string | number;
    onChange: (value: string | number) => void;
}

interface MultipleValuesProps extends BaseProps {
    isMultiple: true;
    value?: (string | number)[];
    onChange: (value: (string | number)[]) => void;
}

type ComboboxProps = SingleValueProps | MultipleValuesProps;

export function Combobox({
    label,
    placeholder,
    searchPlaceholder,
    isMultiple,
    options,
    value,
    onChange,
    error,
    containerClassName,
    labelClassName,
    className,
    required,
}: ComboboxProps) {
    const id = useId();
    const t = useTranslations("components.Combobox");

    const [open, setOpen] = useState(false);

    const isAllSelected = isMultiple && value?.length === options.length;

    const displayValue = (() => {
        if (isMultiple) {
            if (isAllSelected) return t("all");

            return value
                ?.map((v) => options.find((o) => o.value === v)?.label)
                .join(", ");
        }

        return options.find((o) => o.value === value)?.label;
    })();

    const isSelected = (option: { value: string | number }) =>
        isMultiple ? value?.includes(option.value) : value === option.value;

    const onSelect = (option: { value: string | number }) => {
        if (isMultiple) {
            onChange(
                value?.includes(option.value)
                    ? value.filter((v) => v !== option.value)
                    : [...(value || []), option.value].filter(Boolean),
            );
        } else {
            onChange(option.value);
            setOpen(false);
        }
    };

    return (
        <div className={cn("flex flex-col gap-1", containerClassName)}>
            {label && (
                <label
                    htmlFor={id}
                    className={cn("text-sm font-semibold", labelClassName)}
                >
                    {label}
                    {required && <span className="text-destructive"> *</span>}
                </label>
            )}

            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        id={id}
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className={cn("justify-between", className)}
                    >
                        {displayValue || placeholder || t("select-option")}
                        <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                </PopoverTrigger>

                <PopoverContent className="max-h-[--radix-popover-content-available-height] w-[--radix-popover-trigger-width] p-0">
                    <Command>
                        <CommandInput
                            placeholder={
                                searchPlaceholder || t("search-options")
                            }
                        />
                        <CommandList>
                            <CommandEmpty>{t("no-options-found")}</CommandEmpty>

                            <CommandGroup>
                                {options.map((option) => (
                                    <CommandItem
                                        key={option.value}
                                        value={option.value.toString()}
                                        onSelect={() => onSelect(option)}
                                        className="cursor-pointer"
                                    >
                                        <CheckIcon
                                            className={cn(
                                                "mr-2 h-4 w-4",
                                                isSelected(option)
                                                    ? "opacity-100"
                                                    : "opacity-0",
                                            )}
                                        />

                                        {option.label}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>

            {error && (
                <span className="text-destructive mt-1 text-sm">{error}</span>
            )}
        </div>
    );
}
