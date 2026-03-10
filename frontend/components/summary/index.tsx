import { cn } from "@/lib/utils"
import { Card } from "../ui/card"
import { SummaryProps } from "@/utils/interfaces/summary.interface"

export const Summary = ({
  title,
  value,
  description,
  icon: Icon,
  className,
}: SummaryProps) => {
  return (
    <Card className={cn("p-4 bg-linear-to-br text-white overflow-hidden", className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-xs uppercase opacity-90">{title}</p>
          <h2 className="text-3xl font-bold">{value}</h2>
          <p className="text-sm opacity-90">{description}</p>
        </div>
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <Icon />
        </div>
      </div>
    </Card>
  )
}
