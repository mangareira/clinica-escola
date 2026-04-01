import api from "@/lib/axios"
import { useQueryClient } from "@tanstack/react-query"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/appointments/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
      queryClient.invalidateQueries({ queryKey: ['patients'] });
      toast.success("Agendamento removido com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to delete appointment:", error);
      toast.error("Erro ao remover agendamento!");
    }
  });

  return mutation
}
