import api from "@/lib/axios"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";
import { AppointmentPayment } from "@/utils/interfaces/history-type.interface";

export interface PaymentData {
  paymentType: 'Cash' | 'Card' | 'Pix';
  amount: number;
}

export const usePayment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async ({ 
      appointmentId, 
      paymentData 
    }: { 
      appointmentId: string; 
      paymentData: PaymentData 
    }) => {
      const response = await api.post<AppointmentPayment>(
        `/appointment-payments/${appointmentId}/pay`,
        paymentData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Pagamento registrado com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to process payment:", error);
      toast.error("Erro ao registrar pagamento!");
    }
  });

  return mutation
}
