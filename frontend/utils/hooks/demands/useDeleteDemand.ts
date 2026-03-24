import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteDemand = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/demands/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Demanda removida com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to delete demand:", error);
      toast.error("Erro ao remover demanda!");
    }
  });

  return mutation
}
