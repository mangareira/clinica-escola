import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { Demand } from "@/utils/schemas/specialty.schemas"
import { toast } from "sonner";

interface UpdateDemandParams {
  id: string;
  name: string;
}

export const useUpdateDemand = () => {
  const mutation = useMutation({
    mutationFn: async (data: UpdateDemandParams) => {
      const response = await api.put<Demand>(`/demands/update/${data.id}`, { name: data.name });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Demanda atualizada com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to update demand:", error);
      toast.error("Erro ao atualizar demanda!");
    }
  });

  return mutation
}
