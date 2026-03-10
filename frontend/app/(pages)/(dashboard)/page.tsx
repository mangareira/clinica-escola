"use client"

import { useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar } from "lucide-react"
import { CheckCircle, Hourglass, DollarSign, Eye, Edit, Trash2 } from "lucide-react"
import { Summary } from "@/components/summary"

type Appointment = {
  id: string
  name: string
  specialty: string
  dateLabel: string
  time: string
  status: "confirmed" | "checkin" | "finished"
  paid: boolean
}

const sampleAppointments: Appointment[] = [
  {
    id: "1",
    name: "João Silva",
    specialty: "Fisioterapia · Traumato-ortopédica · Externo",
    dateLabel: "Ter",
    time: "08:30",
    status: "finished",
    paid: true,
  },
]

export default function DashboardModern() {
  const [query, setQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [appointments] = useState(sampleAppointments)

  const filtered = useMemo(() => {
    return appointments.filter((a) => {
      if (statusFilter !== "all" && a.status !== statusFilter) return false
      if (query && !a.name.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [appointments, query, statusFilter])

  const counts = useMemo(() => {
    const confirmed = appointments.filter((a) => a.status === "confirmed").length
    const checkin = appointments.filter((a) => a.status === "checkin").length
    const finished = appointments.filter((a) => a.status === "finished").length
    const revenue = appointments.reduce((s, a) => s + (a.paid ? 80 : 0), 0) // exemplo
    return { confirmed, checkin, finished, revenue }
  }, [appointments])

  return (
    <div className=" max-w-7xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-semibold">Visão Geral</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary">Fechar Caixa</Button>
        </div>
      </header>

      {/* cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Summary
          title="Agendamentos hoje"
          description="Pacientes confirmados para o dia"
          icon={Calendar}
          value={counts.confirmed}
          className="from-sky-500 to-cyan-500"
        />
        <Summary
          title="Em Atendimento"
          description="Pacientes em atendimento"
          icon={Hourglass}
          value={counts.checkin}
          className="from-orange-500 to-amber-500"
        />
        <Summary
          title="Finalizados hoje"
          description="Atendimento finalizado"
          icon={CheckCircle}
          value={counts.finished}
          className="from-emerald-600 to-green-500"
        />
        <Summary
          title="Receita total"
          description="Pagamentos registrados"
          icon={DollarSign}
          value={counts.revenue}
          className="from-violet-600 to-indigo-600"
        />
      </div>

      {/* <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle className="text-lg">Agenda</CardTitle>
            <p className="text-sm text-muted-foreground">Filtro rápido e lista de atendimentos</p>
          </div>
          <div className="flex gap-2 items-center">
            <Input
              placeholder="Buscar por nome..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-56"
            />

            <Select onValueChange={(v) => setStatusFilter(v)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Todos os Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Status</SelectItem>
                <SelectItem value="confirmed">Confirmado</SelectItem>
                <SelectItem value="checkin">Check-in</SelectItem>
                <SelectItem value="finished">Finalizado</SelectItem>
              </SelectContent>
            </Select>

            <Button> Novo Agendamento </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Data & Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Pagamento</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((a) => (
                  <TableRow key={a.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={"/placeholder.svg"} alt={a.name} />
                          <AvatarFallback>{a.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{a.name}</div>
                          <div className="text-sm text-muted-foreground">{a.specialty}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{a.dateLabel} · {a.time}</div>
                    </TableCell>
                    <TableCell>
                      {a.status === "finished" && <Badge variant="outline">Finalizado</Badge>}
                      {a.status === "confirmed" && <Badge variant="secondary">Confirmado</Badge>}
                      {a.status === "checkin" && <Badge>Check-in</Badge>}
                    </TableCell>
                    <TableCell>
                      {a.paid ? <Badge>Pago</Badge> : <Badge variant="destructive">Pendente</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 items-center">
                        <Button variant="ghost" size="icon" title="Visualizar">
                          <Eye />
                        </Button>
                        <Button variant="ghost" size="icon" title="Editar">
                          <Edit />
                        </Button>
                        <Button variant="ghost" size="icon" title="Excluir">
                          <Trash2 />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card> */}
    </div>
  )
}
