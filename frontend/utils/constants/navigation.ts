import { BanknoteArrowDown, Calendar, Calendar1, FileChartColumn, History, LayoutDashboard, Ticket, User2,  } from "lucide-react";


export const navigation = [
  { name: "Visão Geral", href: "/", icon: LayoutDashboard, role: ['User', 'Admin'] },
  { name: "Agenda do dia", href: "/agenda", icon: Calendar, role: ['User', 'Admin'] },
  { name: "Semanal", href: "/weekly", icon: Calendar1, role: ['User', 'Admin'] },
  { name: "Histórico", href: "/history", icon: History, role: ['User', 'Admin'] },
  { name: "Serviços", href: "/services", icon: Ticket, role: ['User', 'Admin'] },
  { name: "Caixa", href: "/checkout", icon: BanknoteArrowDown, role: ['Admin'] },
  { name: "Relatórios", href: "/reports", icon: FileChartColumn, role: ['Admin'] },
  { name: "Usuários", href: "/users", icon: User2, role: ['Admin'] },
]