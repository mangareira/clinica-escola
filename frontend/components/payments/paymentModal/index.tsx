'use client';

import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/select';
import { Card } from '@/components/ui/card';
import { Appointment } from '@/utils/interfaces/appointments.interface';
import { usePayment } from '@/utils/hooks/appointments/usePayment';
import { paymentFormSchema, PaymentFormValues } from '@/utils/schemas/payment.schemas';

type PaymentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  appointment: Appointment | null;
};

export const PaymentModal = ({ isOpen, onClose, appointment }: PaymentModalProps) => {
  const paymentMutation = usePayment();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      amount: 0,
      paymentType: undefined,
    },
  });

  // Calcula valores
  const paidAmount = useMemo(() => {
    if (!appointment) return 0;
    // Pega o valor pago através do cashTransaction
    return appointment.cashTransactions?.reduce((acc, transaction) => acc + transaction.amount, 0) || 0;
  }, [appointment]);

  const treatmentValue = useMemo(() => {
    if (!appointment) return 0;
    return appointment.service?.price || 0;
  }, [appointment]);

  const pendingPaymentAmount = useMemo(() => {
    if (!appointment) return 0;
    // Pega o valor pendente do payment criado no check-in
    const pendingPayment = appointment.payments?.find(p => p.payemntsStatus === 'Pending');
    return pendingPayment?.amount || 0;
  }, [appointment]);

  const remainingAmount = treatmentValue - paidAmount;

  // Reset form com o valor do payment pendente
  useEffect(() => {
    if (isOpen && pendingPaymentAmount > 0) {
      form.reset({
        amount: pendingPaymentAmount,
        paymentType: undefined,
      });
    }
  }, [isOpen, pendingPaymentAmount, form]);

  const paymentMethods = [
    { value: 'Cash', label: 'Dinheiro' },
    { value: 'Card', label: 'Cartão' },
    { value: 'Pix', label: 'PIX' },
  ];

  const onSubmit = async (data: PaymentFormValues) => {
    if (!appointment) return;

    paymentMutation.mutate(
      { appointmentId: appointment.id, paymentData: data },
      {
        onSuccess: () => {
          form.reset();
          onClose();
        },
      }
    );
  };

  if (!appointment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Registrar Pagamento</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Card className="p-4 bg-slate-50">
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500 uppercase">Paciente</p>
                <p className="font-semibold text-gray-900">{appointment.patient.name}</p>
              </div>
            </div>
          </Card>
          <div className="grid grid-cols-3 gap-3">
            <Card className="p-3">
              <p className="text-xs text-gray-500 uppercase">Tratamento</p>
              <p className="font-bold text-lg text-gray-900">
                R$ {treatmentValue.toFixed(2)}
              </p>
            </Card>
            <Card className="p-3">
              <p className="text-xs text-gray-500 uppercase">Pago</p>
              <p className="font-bold text-lg text-green-600">
                R$ {paidAmount.toFixed(2)}
              </p>
            </Card>
            <Card className="p-3 border-orange-200 bg-orange-50">
              <p className="text-xs text-gray-500 uppercase">Saldo</p>
              <p className="font-bold text-lg text-orange-600">
                R$ {remainingAmount.toFixed(2)}
              </p>
            </Card>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor a Pagar *</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
                          R$
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8 focus-visible:ring-2 focus-visible:ring-primary"
                          {...field}
                          onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                          disabled={true}
                        />
                      </div>
                    </FormControl>
                    <p className="text-xs text-gray-500 mt-1">
                      Valor gerado automaticamente no check-in
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="paymentType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Método de Pagamento *</FormLabel>
                    <FormControl>
                      <Select
                        placeholder="Selecione o método de pagamento"
                        options={paymentMethods}
                        value={field.value || ''}
                        onChange={field.onChange}
                        disable={paymentMutation.isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-2 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                  disabled={paymentMutation.isPending}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={paymentMutation.isPending || !form.watch('paymentType')}
                  className="gap-2"
                >
                  {paymentMutation.isPending && (
                    <Loader2 className="animate-spin" size={16} />
                  )}
                  {paymentMutation.isPending
                    ? 'Processando...'
                    : 'Confirmar Pagamento'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
