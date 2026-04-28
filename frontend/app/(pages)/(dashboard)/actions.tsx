'use client';

import { useState } from 'react';
import { Edit, MoreHorizontal, Trash, CheckCircle2, CreditCard, LogOut, Ban, Check } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PaymentModal } from '@/components/payments/paymentModal';
import { useConfirm } from '@/utils/hooks/useConfirm';
import { useCheckIn } from '@/utils/hooks/appointments/useCheckIn';
import { useCheckOut } from '@/utils/hooks/appointments/useCheckOut';
import { useUpdateAppointmentStatus } from '@/utils/hooks/appointments/useUpdateAppointmentStatus';
import { Appointment } from '@/utils/interfaces/appointments.interface';
import { validateCheckInEligibility } from '@/lib/utils';
import { useDeleteAppointment } from '@/utils/hooks/appointments/useDeleteAppointment';

export const Actions = ({ appointment }: {appointment: Appointment}) => {
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  const [ConfimationDialog, confirm] = useConfirm(
    'Você tem certeza ?',
    'Você esta prestes a deletar um atendimento'
  )

  const [CancelConfirmDialog, confirmCancel] = useConfirm(
    'Cancelar agendamento?',
    'Uma vez cancelado, não será possível fazer check-in neste agendamento.'
  )

  const [ConfirmPatientDialog, confirmPatient] = useConfirm(
    'Confirmar presença do paciente?',
    'O paciente confirmou que comparecerá ao agendamento.'
  )

  const checkInMutation = useCheckIn();
  const checkOutMutation = useCheckOut();
  const updateStatusMutation = useUpdateAppointmentStatus();
  const deleteAppointment = useDeleteAppointment()

  const appointmentDate = new Date(appointment.dateTime);
  
  const checkInValidation = validateCheckInEligibility(appointmentDate);

  const hasCheckIn = appointment.checkInTime !== null;
  const hasCheckOut = appointment.checkOutTime !== null;
  const isCanceled = appointment.status === 'Canceled';
  const isWaiting = appointment.status === 'Waiting';
  const isConfirmed = appointment.status === 'Confirmed';
  const isCompleted = appointment.status === 'Completed';
  const hasConfirmedPayment = appointment.payments?.some(payment => payment.payemntsStatus === 'Confirmed');

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteAppointment.mutate(appointment.id);
    }
  };

  const onCancel = async () => {
    const ok = await confirmCancel();
    
    if (ok) {
      updateStatusMutation.mutate({
        id: appointment.id,
        status: 'Canceled',
        successMessage: 'Agendamento cancelado com sucesso!',
        errorMessage: 'Erro ao cancelar agendamento!'
      });
    }
  };

  const onConfirmPatient = async () => {
    const ok = await confirmPatient();
    
    if (ok) {
      updateStatusMutation.mutate({
        id: appointment.id,
        status: 'Confirmed',
        successMessage: 'Paciente confirmou presença!',
        errorMessage: 'Erro ao confirmar presença!'
      });
    }
  };

  const onCheckIn = async () => {
    checkInMutation.mutate(appointment.id);
  };

  const onCheckOut = async () => {
    checkOutMutation.mutate(appointment.id);
  };

  const onPayment = () => {
    setIsPaymentModalOpen(true);
  };

  return (
    <>
      <ConfimationDialog />
      <CancelConfirmDialog />
      <ConfirmPatientDialog />
      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        appointment={appointment}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost">
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            // disabled={isPending}
            // onClick={() => onOpen(id)}
          >
            <Edit className="size-4 mr-2" />
            Editar
          </DropdownMenuItem>

          {isWaiting && !isCanceled && !isCompleted && (
            <DropdownMenuItem
              onClick={onConfirmPatient}
              disabled={updateStatusMutation.isPending}
            >
              <Check className="size-4 mr-2" />
              Confirmar Presença
            </DropdownMenuItem>
          )}

          {checkInValidation.canCheckIn && !isCanceled && (isConfirmed || hasCheckIn) && (
            <>
              {!hasCheckIn && (
                <DropdownMenuItem
                  onClick={onCheckIn}
                  disabled={updateStatusMutation.isPending || checkInMutation.isPending}
                >
                  <CheckCircle2 className="size-4 mr-2" />
                  Check-in
                </DropdownMenuItem>
              )}

              {hasCheckIn && (
                <>
                  <DropdownMenuItem
                    onClick={onCheckIn}
                    disabled={true}
                  >
                    <CheckCircle2 className="size-4 mr-2" />
                    Check-in realizado
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={onCheckOut}
                    disabled={hasCheckOut || updateStatusMutation.isPending || checkOutMutation.isPending}
                  >
                    <LogOut className="size-4 mr-2" />
                    {hasCheckOut ? 'Check-out realizado' : 'Check-out'}
                  </DropdownMenuItem>

                  {!hasConfirmedPayment && (
                    <DropdownMenuItem
                      onClick={onPayment}
                    >
                      <CreditCard className="size-4 mr-2" />
                      Registrar Pagamento
                    </DropdownMenuItem>
                  )}

                  {hasConfirmedPayment && (
                    <DropdownMenuItem disabled>
                      <CreditCard className="size-4 mr-2" />
                      Pagamento Confirmado
                    </DropdownMenuItem>
                  )}
                </>
              )}
            </>
          )}

          {!isCanceled && (
            <DropdownMenuItem
              onClick={onCancel}
              disabled={updateStatusMutation.isPending}
            >
              <Ban className="size-4 mr-2" />
              Cancelar Agendamento
            </DropdownMenuItem>
          )}

          {isCanceled && (
            <DropdownMenuItem disabled>
              <Ban className="size-4 mr-2" />
              Agendamento Cancelado
            </DropdownMenuItem>
          )}

          <DropdownMenuItem
            // disabled={isPending}
            onClick={onDelete}
          >
            <Trash className="size-4 mr-2" />
            Deletar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};