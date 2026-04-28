"use client"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Calendar, Plus } from "lucide-react"
import { CheckCircle, Hourglass, DollarSign } from "lucide-react"
import { Summary } from "@/components/summary"
import { useGetAppointments } from "@/utils/hooks/appointments/useGetAppointments"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import DataTable from "@/components/data-table"
import { columns } from "./columns"

export default function DashboardModern() {

  const { data: appointments, isLoading } = useGetAppointments()

  const counts = useMemo(() => {
    const confirmed = appointments?.filter((a) => a.status === "Confirmed").length || 0
    const checkin = appointments?.filter((a) => a.status === "CheckIn").length || 0
    const finished = appointments?.filter((a) => a.status === "Completed").length || 0
    const noShow = appointments?.filter((a) => a.status === "Canceled").length || 0
    const waiting = appointments?.filter((a) => a.status === "Waiting").length || 0
    const revenue = appointments?.reduce((s, a) => s + (a.cashTransactions.reduce((s, c) => s + c.amount, 0)), 0) || 0
    return { confirmed, checkin, finished, noShow, waiting, revenue }
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
          value={counts.waiting || 0}
          className="from-gray-500 to-gray-400"
        />
        <Summary
          title="Agendamentos hoje"
          description="Pacientes confirmados para o dia"
          icon={Calendar}
          value={counts.confirmed || 0}
          className="from-sky-500 to-cyan-500"
        />
        <Summary
          title="Em Atendimento"
          description="Pacientes em atendimento"
          icon={Hourglass}
          value={counts.checkin || 0}
          className="from-orange-500 to-amber-500"
        />
        <Summary
          title="Finalizados hoje"
          description="Atendimento finalizado"
          icon={CheckCircle}
          value={counts.finished || 0}
          className="from-emerald-600 to-green-500"
        />
        <Summary
          title="Receita total"
          description="Pagamentos registrados"
          icon={DollarSign}
          value={counts.revenue || 0}
          className="from-violet-600 to-indigo-600"
        />
      </div>
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 flex items-center justify-between">
          <CardTitle className="text-xl line-clamp-1">Serviços</CardTitle>
          <Button size={'sm'}>
            <Plus className="size-4 mr-2" />
            Adcionar
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={appointments || []}
            disabled={isLoading}
            filterkey="name"
            placeholder="cliente"
            onDelete={(row) => {
              const ids = row.map((r) => r.original.id);
              // mutate(ids);
            }}
            title='Tem certeza ?'
            text='Você esta prestes a deletar alguns agendamentos'
          />
        </CardContent>
      </Card>
    </div>
  )
}
