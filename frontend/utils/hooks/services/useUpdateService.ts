import api from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Service, UpdateServiceFormValues } from "@/utils/schemas/service.schemas"
import { toast } from "sonner";

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: UpdateServiceFormValues) => {
      const response = await api.put<Service>(`/services/update/${data.id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço atualizado com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to update service:", error);
      toast.error("Erro ao atualizar serviço!");
    }
  });

  return mutation
}
