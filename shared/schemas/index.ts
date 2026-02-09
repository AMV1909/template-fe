import { object, number, z } from "zod";

export const infoSchema = object({
    page: number(),
    limit: number(),
    results: number(),
    total: number(),
    nextPage: number().nullable(),
    previousPage: number().nullable(),
});

export const fileSchema =
    typeof FileList !== "undefined"
        ? z
              .instanceof(FileList)
              .nullable()
              .transform((fileList) => fileList?.[0] ?? null)
        : z.null();

export type Info = z.infer<typeof infoSchema>;
