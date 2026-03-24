import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner";

export const useDeleteSpecialty = () => {
  const mutation = useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/specialties/delete/${id}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Especialidade removida com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to delete specialty:", error);
      toast.error("Erro ao remover especialidade!");
    }
  });

  return mutation
}
