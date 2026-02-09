import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";

import {
    todoFormSchema,
    todoStatus,
    type Todo,
    type TodoFormData,
} from "./todosSchemas";
import { useCreateTodo, useUpdateTodo } from "./useTodos";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Button } from "@/shared/components/Button";
import { Select } from "@/shared/components/Select";

interface TodoFormProps {
    todo?: Todo;
    onSuccess?: () => void;
    onError?: () => void;
}

export function TodoForm({ todo, onSuccess, onError }: TodoFormProps) {
    const t = useTranslations("TodosPage.form");

    const isEdit = !!todo;

    const {
        control,
        watch,
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(todoFormSchema(t)),
        defaultValues: {
            title: todo?.title ?? "",
            description: todo?.description ?? "",
            image: null,
            status: todo?.status ?? "TODO",
        },
    });

    const file = watch("image");
    const image = file instanceof File ? URL.createObjectURL(file) : null;
    const imageUrl = image || todo?.imageUrl;

    const { createTodo } = useCreateTodo();
    const { updateTodo } = useUpdateTodo();

    const onSubmit = async (data: TodoFormData) => {
        if (todo) {
            onSuccess?.();
            await updateTodo({ ...data, id: todo.id }).catch(onError);
        } else {
            onSuccess?.();
            await createTodo(data).catch(onError);
        }
    };

    return (
        <form
            data-testid="todo-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
        >
            <Input
                data-testid="title-input"
                label={t("title.label")}
                placeholder={t("title.placeholder")}
                {...register("title")}
                error={errors.title?.message}
                required
            />

            <Textarea
                data-testid="description-textarea"
                label={t("description.label")}
                placeholder={t("description.placeholder")}
                {...register("description")}
                error={errors.description?.message}
            />

            {isEdit && (
                <Controller
                    control={control}
                    name="status"
                    render={({ field }) => (
                        <Select
                            data-testid="status-select"
                            label={t("status.label")}
                            placeholder={t("status.placeholder")}
                            options={todoStatus.map((status) => ({
                                label: t(`status.${status}`),
                                value: status,
                            }))}
                            {...field}
                            error={errors.status?.message}
                            className="w-full"
                        />
                    )}
                />
            )}

            <Input
                type="file"
                label={t("image.label")}
                placeholder={t("image.placeholder")}
                {...register("image")}
                accept="image/*"
                error={errors.image?.message}
            />

            {imageUrl && (
                <Image
                    src={imageUrl}
                    alt={todo?.title || "Todo image"}
                    width={450}
                    height={250}
                    className="h-[250px] w-full rounded-lg object-cover"
                    priority
                />
            )}

            <div className="mx-auto">
                <Button
                    data-testid="create-update-todo-button"
                    type="submit"
                    loading={isSubmitting}
                >
                    {todo ? t("submit.edit") : t("submit.create")}
                </Button>
            </div>
        </form>
    );
}
