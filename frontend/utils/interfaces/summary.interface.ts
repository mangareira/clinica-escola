import { LucideIcon } from "lucide-react"

export interface SummaryProps {
  title: string
  value: string | number
  description: string
  icon: LucideIcon
  className?: string
}