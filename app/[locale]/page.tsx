"use client";

import { useEffect, useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { LogOut, Plus, Search } from "lucide-react";

import { useAppStore } from "@/shared/store";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";
import {
    todoStatus,
    type Todo,
    type TodoStatus,
} from "@/features/todos/todosSchemas";
import { Combobox } from "@/shared/components/Combobox";
import { useTodos } from "@/features/todos/useTodos";
import { TodoList } from "@/features/todos/TodoList";
import { AddOrEditTodoModal } from "@/features/todos/AddOrEditTodoModal";
import { useAuth } from "@/features/login/useLogin";

export default function Home() {
    const t = useTranslations("TodosPage");
    const { user, hasHydrated } = useAppStore();
    const { logout } = useAuth();
    const router = useRouter();

    const [isOpenModal, setIsOpenModal] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState<Todo | undefined>();

    const [search, setSearch] = useState("");
    const [status, setStatus] = useState<TodoStatus[]>([...todoStatus]);

    useEffect(() => {
        if (!user && hasHydrated) router.push("/login");
    }, [router, user, hasHydrated]);

    const {
        todos,
        isLoadingTodos,
        isErrorTodos,
        refetchTodos,
        hasNextPage,
        fetchNextPage,
        isFetchingNextPage,
    } = useTodos({
        search,
        status,
    });

    const selectTodo = (todo: Todo) => {
        setSelectedTodo(todo);
        setIsOpenModal(true);
    };

    if (!user) return null;

    return (
        <main className="flex h-screen flex-col items-center gap-4 overflow-y-auto py-4">
            <h1 className="text-2xl font-bold">{t("title")}</h1>

            <Button
                Icon={LogOut}
                onClick={logout}
                className="fixed top-4 right-4"
            >
                {t("logout")}
            </Button>

            <section className="mx-4 flex max-w-full flex-col items-end gap-2 rounded-lg p-4 shadow-md sm:flex-row">
                <Input
                    type="search"
                    label={t("form.search.label")}
                    placeholder={t("form.search.placeholder")}
                    containerClassName="w-full"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Combobox
                    label={t("form.status.label")}
                    options={todoStatus.map((status) => ({
                        label: t(`form.status.${status}`),
                        value: status,
                    }))}
                    value={status}
                    onChange={(value) => setStatus(value as TodoStatus[])}
                    containerClassName="w-full sm:w-auto"
                    isMultiple
                />

                <Button
                    Icon={Search}
                    onClick={() => refetchTodos()}
                    className="mx-auto"
                />
            </section>

            <AddOrEditTodoModal
                todo={selectedTodo}
                isOpen={isOpenModal}
                setIsOpen={setIsOpenModal}
                onSuccess={refetchTodos}
            >
                <Button
                    data-testid="add-todo-button"
                    Icon={Plus}
                    onClick={() => setSelectedTodo(undefined)}
                >
                    {t("todos.actions.add")}
                </Button>
            </AddOrEditTodoModal>

            <TodoList
                todos={todos}
                hasMore={hasNextPage}
                loadMore={fetchNextPage}
                selectTodo={selectTodo}
                isLoadingTodos={isLoadingTodos}
                isFetchingNextPage={isFetchingNextPage}
                isErrorTodos={isErrorTodos}
                refetchTodos={refetchTodos}
            />
        </main>
    );
}
