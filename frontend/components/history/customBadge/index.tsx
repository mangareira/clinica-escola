import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type BadgeVariant =
  | "info"
  | "success"
  | "warning"
  | "neutral"

export function CustomBadge({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode
  variant?: BadgeVariant
}) {
  const styles = {
    info: "bg-blue-100 text-blue-700",
    success: "bg-teal-100 text-teal-700",
    warning: "bg-orange-100 text-orange-700",
    neutral: "bg-gray-100 text-gray-700",
  }

  return (
    <Badge className={cn("font-medium text-sm px-3 py-1", styles[variant])}>
      {children}
    </Badge>
  )
}