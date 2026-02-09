import axios from "axios";
import { env } from "@/config/env";

import { formatQueryParams } from "@/shared/helpers/formatters";

export const api = axios.create({
    baseURL: env.NEXT_PUBLIC_API_URL,
    paramsSerializer: (params) => formatQueryParams(params),
});
