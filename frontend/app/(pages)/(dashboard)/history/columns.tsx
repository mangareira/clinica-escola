'use client';

import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
// import { Actions } from './actions'; // Ajuste o caminho conforme necessário
import { Appointment } from '@/utils/interfaces/history-type.interface'; // Ajuste o caminho
import { convertAmountFromMiliunitis, formatCurrency } from '@/lib/utils';
import { Actions } from './actions';

// Funções auxiliares (se não estiverem disponíveis globalmente)
// import { formatCurrency, convertAmountFromMiliunitis } from '@/lib/utils';

// Mapeamento de cores para os status
const statusVariant = {
  Waiting: 'warning',
  Confirmed: 'info',
  CheckIn: 'secondary',
  Completed: 'success',
  Canceled: 'destructive',
} as const;

export const columns: ColumnDef<Appointment>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        aria-label="Selecionar todos"
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        aria-label="Selecionar linha"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'dateTime',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Data/Hora
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      return (
        <span>
          {format(new Date(row.getValue('dateTime')), "dd MMMM, yyyy 'às' HH:mm", {
            locale: ptBR,
          })}
        </span>
      );
    },
  },
  {
    accessorKey: 'service',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Serviço
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const service = row.original.service;
      return (
        <div>
          <span className="font-medium">{service.type}</span>
          <span className="ml-2 text-xs text-muted-foreground">
            {formatCurrency(service.price)}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Status
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const status = row.getValue('status') as Appointment['status'];
      return (
        <Badge className="capitalize">
          {status === 'Waiting'
            ? 'Aguardando'
            : status === 'Confirmed'
            ? 'Confirmado'
            : status === 'CheckIn'
            ? 'Check-in'
            : status === 'Completed'
            ? 'Concluído'
            : 'Cancelado'}
        </Badge>
      );
    },
  },
  {
    accessorKey: 'specialty',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Especialidade
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const specialty = row.original.specialty;
      return <span>{specialty?.name || '-'}</span>;
    },
  },
  {
    accessorKey: 'demand',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Demanda
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const demand = row.original.demand;
      return <span>{demand?.name || '-'}</span>;
    },
  },
  {
    accessorKey: 'sessionHistory',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Sessões
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const sessionHistory = row.original.sessionHistory;
      return <span>{sessionHistory?.length || '-'}</span>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];