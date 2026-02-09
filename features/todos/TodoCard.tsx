import { useTranslations } from "next-intl";
import { X } from "lucide-react";
import Image from "next/image";
import type { MouseEvent } from "react";

import { Button } from "@/shared/components/Button";
import { TodoBadgeStatus } from "./TodoBadgeStatus";
import { useDeleteTodo } from "./useTodos";
import type { Todo } from "./todosSchemas";

interface TodoCardProps {
    todo: Todo;
    selectTodo: (todo: Todo) => void;
}

export function TodoCard({ todo, selectTodo }: TodoCardProps) {
    const t = useTranslations("TodosPage.todos.actions");
    const { deleteTodo } = useDeleteTodo();

    const handleDeleteTodo = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if (!window.confirm(t("confirm-delete"))) return;
        deleteTodo(todo.id);
    };

    return (
        <article
            data-testid={`todo-card-${todo.id}`}
            onClick={() => selectTodo(todo)}
            className="relative h-fit w-[250px] cursor-pointer rounded-lg p-4 shadow-md transition-all duration-100 hover:bg-gray-100"
        >
            <h2>{todo.title}</h2>
            <p className="text-sm text-gray-500">{todo.description}</p>
            
            <TodoBadgeStatus
                todoId={todo.id}
                status={todo.status}
                className="mt-2"
            />

            {todo.imageUrl && (
                <Image
                    src={todo.imageUrl}
                    alt={todo.title}
                    width={450}
                    height={250}
                    className="mt-2 rounded-lg"
                    priority
                />
            )}

            <Button
                data-testid={`delete-todo-button-${todo.id}`}
                variant="ghost"
                size="icon"
                Icon={X}
                className="absolute top-0 right-0"
                onClick={handleDeleteTodo}
            />
        </article>
    );
}
