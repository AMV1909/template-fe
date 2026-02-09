import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";

export const locales = ["en", "es"];
export const defaultLocale = "en";

export default createMiddleware(routing);

export const config = {
    matcher: ["/((?!_next|favicon.ico|images|.*\\..*).*)"],
};
