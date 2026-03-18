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
import DataTable from "@/components/data-table"

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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <Summary
          title="Em espera"
          description="Em espera da confimação do paciente"
          icon={Calendar}
          value={10}
          className="from-gray-500 to-gray-400"
        />
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
      {/* <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex-row items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">Serviços</CardTitle> */}
          {/* <Button size={'sm'} onClick={onOpen}>
            <Plus className="size-4 mr-2" />
            Adcionar
          </Button> */}
        {/* </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={tableData}
            disabled={isLoading}
            filterkey="client"
            placeholder="cliente"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              mutate(ids);
            }}
            title='Tem certeza ?'
            text='Você esta prestes a deletar alguns agendamentos'
          />
        </CardContent>
      </Card> */}
    </div>
  )
}
