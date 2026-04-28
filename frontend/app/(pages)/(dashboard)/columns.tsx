import { Button } from "@/components/ui/button";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/utils/interfaces/appointments.interface";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Actions } from "./actions";

export const columns: ColumnDef<Appointment>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Paciente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const appointment = row.original;

      const typeTranslations: Record<string, string> = {
        Employee: 'Funcionário',
        External: 'Externo',
        Exempt: 'Isento',
      };

      return (
        <div className="flex flex-row justify-center items-center text-center p-2 gap-x-2">
          <span className="font-bold text-base">{appointment.patient.name}: </span>
          <span className="text-xs text-muted-foreground mt-1">
            {typeTranslations[appointment.patient.type] || appointment.patient.type}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "demand",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Tipo de Problema
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex flex-col justify-center items-center text-center p-2">
          <span className="font-medium text-sm">{appointment.service?.type || '-'}</span>
          <span className="text-xs text-muted-foreground mt-1">
            {appointment.demand?.name || 'Sem Demanda'}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "dateTime",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Data e Hora
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const appointment = row.original;

      return (
        <div className="flex flex-col justify-center items-center text-center p-2">
          <span className="text-sm font-medium">{formatDateTime(appointment.dateTime)}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const appointment = row.original;

      const statusTranslations: Record<string, string> = {
        Waiting: 'Aguardando',
        Confirmed: 'Confirmado',
        CheckIn: 'Check-in',
        Completed: 'Concluído',
        Canceled: 'Cancelado',
      };

      const statusColors: Record<string, string> = {
        Waiting: 'bg-yellow-100 text-yellow-800',
        Confirmed: 'bg-blue-100 text-blue-800',
        CheckIn: 'bg-purple-100 text-purple-800',
        Completed: 'bg-green-100 text-green-800',
        Canceled: 'bg-red-100 text-red-800',
      };

      return (
        <div className="flex justify-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[appointment.status] || 'bg-gray-100 text-gray-800'}`}>
            {statusTranslations[appointment.status] || appointment.status}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "paymentStatus",
    header: ({ column }) => (
      <div className="flex justify-center">
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Status Pagamento
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      </div>
    ),
    cell: ({ row }) => {
      const appointment = row.original;
      const lastPayment = appointment.payments?.[0];

      const paymentStatusTranslations: Record<string, string> = {
        Pending: 'Pendente',
        Confirmed: 'Pago',
        Canceled: 'Cancelado',
      };

      const paymentStatusColors: Record<string, string> = {
        Pending: 'bg-orange-100 text-orange-800',
        Confirmed: 'bg-green-100 text-green-800',
        Canceled: 'bg-red-100 text-red-800',
      };

      return (
        <div className="flex justify-center">
          {lastPayment ? (
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentStatusColors[lastPayment.payemntsStatus] || 'bg-gray-100 text-gray-800'}`}>
              {paymentStatusTranslations[lastPayment.payemntsStatus] || lastPayment.payemntsStatus}
            </span>
          ) : (
            <span className="text-xs text-muted-foreground">-</span>
          )}
        </div>
      );
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions appointment={row.original} />,
  },
]