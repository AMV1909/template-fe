import type { z, ZodType } from "zod";

export const validateZodSchema = <T extends ZodType>(
    schema: T,
    data: unknown,
): z.infer<T> => {
    return schema.parse(data);
};
