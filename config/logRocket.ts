import LogRocket from "logrocket";
import { env } from "./env";

LogRocket.init(env.NEXT_PUBLIC_LOGROCKET_APP_ID);