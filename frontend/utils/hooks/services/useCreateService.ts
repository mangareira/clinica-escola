import api from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateServiceFormValues, Service } from "@/utils/schemas/service.schemas"
import { toast } from "sonner";

export const useCreateService = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateServiceFormValues) => {
      const response = await api.post<Service>("/services/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Serviço criado com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to create service:", error);
      toast.error("Erro ao criar serviço!");
    }
  });

  return mutation
}
