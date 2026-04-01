'use client'

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PatientHistory } from "@/utils/interfaces/history-type.interface"
import { format } from "date-fns"
import { CustomBadge } from "../customBadge"
import { formatPhone, cn } from "@/lib/utils"
import DataTable from "@/components/data-table"
import { columns } from "@/app/(pages)/(dashboard)/history/columns"
import { ChevronDown, ChevronUp } from "lucide-react"


export const PatientCard = ({ patient }: { patient: PatientHistory }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasAppointments = patient.appointments && patient.appointments.length > 0;
  const sortedAppointments = hasAppointments 
    ? [...patient.appointments].sort((a, b) => new Date(b.dateTime).getTime() - new Date(a.dateTime).getTime())
    : [];
  const lastAppointment = sortedAppointments[0];

  const totalSessions = hasAppointments 
    ? patient.appointments.reduce((acc, appointment) => acc + (appointment.sessionHistory?.length || 0), 0)
    : 0;

  const totalPayments = hasAppointments 
    ? patient.appointments.reduce((acc, appointment) => acc + (appointment.payments?.reduce((pAcc, payment) => pAcc + payment.amount, 0) || 0), 0)
    : 0;

  return (
    <Card className="rounded-2xl border bg-white shadow-sm hover:shadow-md transition mt-4">
      <CardContent className="flex flex-col gap-3">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {patient.name}
            </h2>
            <p className="text-sm text-gray-500">
              Contato: {formatPhone(patient.phone)}
            </p>
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <CustomBadge variant="info">
              {patient.appointments?.length || 0} atendimento{patient.appointments?.length !== 1 ? 's' : ''}
            </CustomBadge>
            <CustomBadge variant="info">
              {totalSessions} sessão{totalSessions !== 1 ? 's' : ''}
            </CustomBadge>
            <CustomBadge variant="success">
              Recebido: R$ {totalPayments.toFixed(2)}
            </CustomBadge>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-400 uppercase">
              Último atendimento
            </p>
            <p className="font-medium text-gray-800">
              {lastAppointment ? format(new Date(lastAppointment.dateTime), "dd/MM/yyyy") : "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">
              Status
            </p>
            <div className="mt-1">
              {lastAppointment ? (
                <CustomBadge variant="success">
                  {lastAppointment.status === 'Waiting'
                    ? 'Aguardando'
                    : lastAppointment.status === 'Confirmed'
                      ? 'Confirmado'
                      : lastAppointment.status === 'CheckIn'
                        ? 'Check-in'
                        : lastAppointment.status === 'Completed'
                          ? 'Concluído'
                          : 'Cancelado'}
                </CustomBadge>
              ) : (
                <CustomBadge variant="neutral">-</CustomBadge>
              )}
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase">
              Serviço recente
            </p>
            <p className="font-medium text-gray-800">
              {lastAppointment?.service?.type || "-"}
            </p>
          </div>

        </div>
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2"
          >
            {isExpanded ? "Recolher histórico" : "Ver histórico completo"}
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        <div 
          className={cn(
            "grid transition-all duration-300 ease-in-out", 
            isExpanded ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="overflow-hidden">
            <DataTable
              columns={columns}
              data={patient.appointments || []}
              disabled={false}
              filterkey="status"
              placeholder="Serviço"
              onDelete={(row) => {
                const ids = row.map((r) => r.original.id);
                // mutate(ids);
              }}
              title='Tem certeza ?'
              text='Você esta prestes a deletar alguns serviços'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}