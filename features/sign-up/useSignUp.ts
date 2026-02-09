import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { toast } from "react-hot-toast";
import type { AxiosError } from "axios";

import { postData } from "@/shared/helpers/requests";
import { authRoutes } from "@/shared/utils/routes";
import { userSchema } from "../users/usersSchemas";
import type { SignUpFormSchema } from "./signUpSchemas";

export const useSignUp = () => {
    const t = useTranslations("SignUpPage.form");
    const router = useRouter();

    interface SignUpVariables extends SignUpFormSchema {
        profilePicture: File | null;
    }

    const { mutateAsync, isPending, ...rest } = useMutation({
        mutationFn: (data: SignUpVariables) =>
            postData({
                endpoint: authRoutes.signUp,
                schema: userSchema,
                responseSchemaKey: "user",
                data,
                isFormData: true,
            }),
        onMutate: () => toast.loading(t("loading"), { id: "loading" }),
        onSuccess: () => {
            toast.success(t("success"));
            router.push("/login");
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 409)
                return toast.error(t("errors.conflict"));
        },
        onSettled: () => toast.dismiss("loading"),
    });

    return { signUp: mutateAsync, isSigningUp: isPending, ...rest };
};
