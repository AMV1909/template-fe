import {
    useInfiniteQuery,
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "react-hot-toast";

import {
    deleteData,
    getData,
    postData,
    putData,
} from "@/shared/helpers/requests";
import { todosRoutes } from "@/shared/utils/routes";
import {
    todoSchema,
    todosResponseSchema,
    type TodoFormData,
    type TodosResponse,
    type TodoStatus,
} from "./todosSchemas";
import { clearFalsyData } from "@/shared/helpers/clearFalsyData";
import { useAppStore } from "@/shared/store";

interface UseTodosProps {
    page?: number;
    limit?: number;
    search?: string;
    status?: TodoStatus[];
}

export const todosQueryKey = "todos";

export const useTodos = ({ page, ...props }: UseTodosProps) => {
    const { user } = useAppStore();

    const { data, isFetching, refetch, isError, ...rest } =
        useInfiniteQuery<TodosResponse>({
            queryKey: [todosQueryKey],
            queryFn: ({ pageParam = 1 }) =>
                getData({
                    endpoint: todosRoutes.getTodos,
                    params: clearFalsyData({
                        page: page || pageParam,
                        ...props,
                    }),
                    schema: todosResponseSchema,
                }),
            initialPageParam: 1,
            getNextPageParam: (lastPage) => lastPage.info.nextPage,
            getPreviousPageParam: (firstPage) => firstPage.info.previousPage,
            enabled: !!user,
        });

    return {
        todos: data?.pages.flatMap((page) => page.todos) ?? [],
        isLoadingTodos: isFetching,
        isErrorTodos: isError,
        refetchTodos: refetch,
        ...rest,
    };
};

export const useCreateTodo = () => {
    const t = useTranslations("TodosPage.form");
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: TodoFormData) =>
            postData({
                endpoint: todosRoutes.createTodo,
                schema: todoSchema,
                responseSchemaKey: "todo",
                data,
                isFormData: true,
            }),
        onMutate: async (newTodo) => {
            await queryClient.cancelQueries({ queryKey: [todosQueryKey] });

            const previousTodos = queryClient.getQueryData([todosQueryKey]);

            queryClient.setQueryData<{
                pages: TodosResponse[];
                pageParams: number[];
            }>([todosQueryKey], (old) => {
                if (!old) return old;

                const optimisticTodo = {
                    id: `temp-${Date.now()}`,
                    title: newTodo.title,
                    description: newTodo.description,
                    imageUrl: newTodo.image
                        ? URL.createObjectURL(newTodo.image)
                        : null,
                    status: "TODO" as const,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                };

                return {
                    ...old,
                    pages: old.pages.map((page, index) =>
                        index === 0
                            ? {
                                  ...page,
                                  todos: [optimisticTodo, ...page.todos],
                              }
                            : page,
                    ),
                };
            });

            return { previousTodos };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(
                    [todosQueryKey],
                    context.previousTodos,
                );
            }
        },
        onSuccess: () => toast.success(t("success.create")),
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: [todosQueryKey] }),
    });

    return { createTodo: mutateAsync, isCreatingTodo: isPending, ...rest };
};

export const useUpdateTodo = () => {
    const t = useTranslations("TodosPage.form");
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: TodoFormData & { id: string }) =>
            putData({
                endpoint: todosRoutes.updateTodo(data.id),
                schema: todoSchema,
                responseSchemaKey: "todo",
                data,
                isFormData: true,
            }),
        onMutate: async (updatedTodo) => {
            await queryClient.cancelQueries({ queryKey: [todosQueryKey] });

            const previousTodos = queryClient.getQueryData([todosQueryKey]);

            queryClient.setQueryData<{
                pages: TodosResponse[];
                pageParams: number[];
            }>([todosQueryKey], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        todos: page.todos.map((todo) =>
                            todo.id === updatedTodo.id
                                ? {
                                      ...todo,
                                      ...updatedTodo,
                                      updatedAt: new Date().toISOString(),
                                  }
                                : todo,
                        ),
                    })),
                };
            });

            return { previousTodos };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(
                    [todosQueryKey],
                    context.previousTodos,
                );
            }
        },
        onSuccess: () => toast.success(t("success.edit")),
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: [todosQueryKey] }),
    });

    return { updateTodo: mutateAsync, isUpdatingTodo: isPending, ...rest };
};

export const useDeleteTodo = () => {
    const t = useTranslations("TodosPage.form");
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (id: string) =>
            deleteData({
                endpoint: todosRoutes.deleteTodo(id),
            }),
        onMutate: async (deletedTodoId) => {
            await queryClient.cancelQueries({ queryKey: [todosQueryKey] });

            const previousTodos = queryClient.getQueryData([todosQueryKey]);

            queryClient.setQueryData<{
                pages: TodosResponse[];
                pageParams: number[];
            }>([todosQueryKey], (old) => {
                if (!old) return old;

                return {
                    ...old,
                    pages: old.pages.map((page) => ({
                        ...page,
                        todos: page.todos.filter(
                            (todo) => todo.id !== deletedTodoId,
                        ),
                    })),
                };
            });

            return { previousTodos };
        },
        onError: (_error, _variables, context) => {
            if (context?.previousTodos) {
                queryClient.setQueryData(
                    [todosQueryKey],
                    context.previousTodos,
                );
            }
        },
        onSuccess: () => toast.success(t("success.delete")),
        onSettled: () =>
            queryClient.invalidateQueries({ queryKey: [todosQueryKey] }),
    });

    return { deleteTodo: mutateAsync, isDeletingTodo: isPending, ...rest };
};
