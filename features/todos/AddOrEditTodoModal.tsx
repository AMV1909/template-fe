"use client";

import { useTranslations } from "next-intl";
import type { ReactNode } from "react";

import { Modal } from "@/shared/components/Modal";
import { type Todo } from "./todosSchemas";
import { TodoForm } from "./TodoForm";

interface AddOrEditTodoModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    onSuccess?: () => void;
    onError?: () => void;
    todo?: Todo;
    children: ReactNode;
}

export function AddOrEditTodoModal({
    isOpen,
    setIsOpen,
    onSuccess,
    onError,
    todo,
    children,
}: AddOrEditTodoModalProps) {
    const t = useTranslations("TodosPage.todos.actions");

    const handleSuccess = () => {
        setIsOpen(false);
        onSuccess?.();
    };

    const handleError = () => {
        setIsOpen(true);
        onError?.();
    };

    return (
        <Modal
            title={todo ? t("edit") : t("add")}
            open={isOpen}
            onOpenChange={setIsOpen}
            children={children}
            content={
                <TodoForm
                    todo={todo}
                    onSuccess={handleSuccess}
                    onError={handleError}
                />
            }
        />
    );
}
