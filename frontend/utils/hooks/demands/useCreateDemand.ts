import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { CreateDemandFormValues, Demand } from "@/utils/schemas/specialty.schemas"
import { toast } from "sonner";

export const useCreateDemand = () => {
  const mutation = useMutation({
    mutationFn: async (data: CreateDemandFormValues) => {
      const response = await api.post<Demand>("/demands/create", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Demanda criada com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to create demand:", error);
      toast.error("Erro ao criar demanda!");
    }
  });

  return mutation
}
