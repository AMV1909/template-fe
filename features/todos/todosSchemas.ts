import { object, string, url, enum as _enum, iso, array, z } from "zod";
import { fileSchema, infoSchema } from "@/shared/schemas";
import type { TFunction } from "@/shared/types/types";

export const todoStatus = ["TODO", "IN_PROGRESS", "COMPLETED"] as const;

export const todoSchema = object({
    id: string(),
    title: string(),
    description: string().nullable(),
    imageUrl: url().nullable(),
    status: _enum(todoStatus),
    createdAt: iso.datetime(),
    updatedAt: iso.datetime(),
});

export const todosResponseSchema = object({
    todos: array(todoSchema),
    info: infoSchema,
});

export const todoFormSchema = (t: TFunction) =>
    object({
        title: string()
            .min(1, t("title.required"))
            .max(255, t("title.maxLength")),
        description: string().max(255, t("description.maxLength")).nullable(),
        image: fileSchema.nullable().refine((file) => {
            if (!file) return true;
            if (!file.type.includes("image")) return t("image.invalid");
            if (file.size > 1024 * 1024 * 5)
                return t("image.maxSize", { maxSize: 5 });

            return true;
        }),
        status: _enum(todoStatus).default("TODO"),
    });

export type TodoStatus = (typeof todoStatus)[number];
export type Todo = z.infer<typeof todoSchema>;
export type TodosResponse = z.infer<typeof todosResponseSchema>;
export type TodoFormData = z.infer<ReturnType<typeof todoFormSchema>>;
