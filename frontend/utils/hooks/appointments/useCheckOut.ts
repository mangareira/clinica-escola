import api from "@/lib/axios"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";
import { AppointmentSession } from "@/utils/interfaces/history-type.interface";

export const useCheckOut = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await api.post<AppointmentSession>(
        `/appointment-sessions/${appointmentId}/check-out`
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Check-out realizado com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to check-out appointment:", error);
      toast.error("Erro ao realizar check-out!");
    }
  });

  return mutation
}
