import { useTranslations } from "next-intl";

import { Loader } from "@/shared/components/Loader";
import { Button } from "@/shared/components/Button";
import { TodoCard } from "./TodoCard";
import type { Todo } from "./todosSchemas";

interface TodoListProps {
    todos: Todo[];
    hasMore: boolean;
    loadMore: () => void;
    selectTodo: (todo: Todo) => void;
    refetchTodos: () => void;
    isLoadingTodos: boolean;
    isFetchingNextPage: boolean;
    isErrorTodos: boolean;
}

export function TodoList({
    todos,
    hasMore,
    loadMore,
    selectTodo,
    refetchTodos,
    isLoadingTodos,
    isFetchingNextPage,
    isErrorTodos,
}: TodoListProps) {
    const t = useTranslations("TodosPage");
    if (isLoadingTodos && !isFetchingNextPage) return <Loader />;

    if (isErrorTodos)
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-destructive">Error al cargar los todos</p>
                <Button onClick={refetchTodos}>Reintentar</Button>
            </div>
        );

    return (
        <section data-testid="todo-list" className="flex flex-wrap justify-center gap-4 overflow-y-auto p-2">
            {todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} selectTodo={selectTodo} />
            ))}

            {isFetchingNextPage && <Loader className="h-fit" />}

            {!isLoadingTodos && hasMore && (
                <div className="flex w-full justify-center">
                    <Button onClick={loadMore}>{t("loadMore")}</Button>
                </div>
            )}
        </section>
    );
}
