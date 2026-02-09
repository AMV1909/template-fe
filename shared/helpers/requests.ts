import type { ResponseType } from "axios";
import type { ZodType } from "zod";

import { api } from "@/shared/utils/axios";
import { clearFalsyData } from "./clearFalsyData";
import { auth } from "@/config/firebase";
import { validateZodSchema } from "./zodValidator";

type RequestConfig<T extends ZodType = ZodType> = {
    method?: "get" | "post" | "put" | "delete";
    endpoint: string;
    params?: object;
    data?: object;
    responseType?: ResponseType;
    schema?: T;
    responseSchemaKey?: string;
    isFormData?: boolean;
};

export const request = async <T extends ZodType>({
    method = "get",
    endpoint,
    params,
    data,
    responseType,
    schema,
    responseSchemaKey,
    isFormData,
}: RequestConfig<T>) => {
    const firebaseIdToken = await auth.currentUser?.getIdToken();

    const headers = {
        Authorization: `Bearer ${firebaseIdToken}`,
        ...(isFormData && { "Content-Type": "multipart/form-data" }),
    };

    const baseRequest = ["get", "delete"].includes(method)
        ? api[method](endpoint, {
              headers,
              ...(params && { params: clearFalsyData(params) }),
              responseType,
          })
        : api[method](endpoint, data, {
              headers,
              ...(params && { params: clearFalsyData(params) }),
              responseType,
          });

    return baseRequest
        .then((res) => res.data)
        .then((data) => {
            if (!schema) return data;
            if (!responseSchemaKey) return validateZodSchema(schema, data);

            return validateZodSchema(schema, data[responseSchemaKey]);
        })
        .catch((err) => {
            console.error(err);
            throw err;
        });
};

export const getData = <T extends ZodType>(
    config: Omit<RequestConfig<T>, "method">,
) => request<T>({ ...config, method: "get" });

export const postData = <T extends ZodType>(
    config: Omit<RequestConfig<T>, "method">,
) => request<T>({ ...config, method: "post" });

export const putData = <T extends ZodType>(
    config: Omit<RequestConfig<T>, "method">,
) => request<T>({ ...config, method: "put" });

export const deleteData = <T extends ZodType>(
    config: Omit<RequestConfig<T>, "method">,
) => request<T>({ ...config, method: "delete" });
