import api from "@/lib/axios"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateServiceFormValues, Service } from "@/utils/schemas/service.schemas"

export const useCreateService = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data: CreateServiceFormValues) => {
      const response = await api.post<Service>("/services/create", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });

  return mutation
}
