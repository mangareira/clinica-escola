import api from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/services/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço deletado com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to delete service:", error);
      toast.error("Erro ao deletar serviço!");
    }
  });

  return mutation
}
