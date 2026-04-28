import api from "@/lib/axios"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

interface UpdateAppointmentStatusParams {
  id: string;
  status: 'Canceled' | 'Confirmed' | 'Waiting' | 'CheckIn' | 'Completed';
  successMessage?: string;
  errorMessage?: string;
}

export const useUpdateAppointmentStatus = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (params: UpdateAppointmentStatusParams) => {
      const response = await api.put(`/appointments/${params.id}/status`, {
        status: params.status
      });
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      const message = variables.successMessage || `Status atualizado para ${variables.status}!`;
      toast.success(message);
    },
    onError: (error, variables) => {
      console.error("Failed to update appointment status:", error);
      const message = variables.errorMessage || "Erro ao atualizar agendamento!";
      toast.error(message);
    }
  });

  return mutation
}
