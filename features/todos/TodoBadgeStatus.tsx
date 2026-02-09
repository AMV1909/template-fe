import { Badge } from "@/shared/components/Badge";
import { cn } from "@/shared/utils/cn";
import { prettifyText } from "@/shared/helpers/formatters";
import type { Todo } from "./todosSchemas";

interface BadgeStatusProps {
    todoId: Todo["id"];
    status: Todo["status"];
    className?: string;
}

export function TodoBadgeStatus({
    todoId,
    status,
    className,
}: BadgeStatusProps) {
    const statusMap: Record<Todo["status"], string> = {
        TODO: "bg-blue-100 text-blue-500",
        IN_PROGRESS: "bg-yellow-100 text-yellow-500",
        COMPLETED: "bg-green-100 text-green-500",
    };

    return (
        <Badge
            data-testid={`todo-badge-status-${todoId}`}
            className={cn("font-semibold", statusMap[status], className)}
        >
            {prettifyText(status)}
        </Badge>
    );
}
