import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { Specialty } from "@/utils/schemas/specialty.schemas"
import { toast } from "sonner";

interface UpdateSpecialtyParams {
  id: string;
  name: string;
}

export const useUpdateSpecialty = () => {
  const mutation = useMutation({
    mutationFn: async (data: UpdateSpecialtyParams) => {
      const response = await api.put<Specialty>(`/specialties/update/${data.id}`, { name: data.name });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Especialidade atualizada com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to update specialty:", error);
      toast.error("Erro ao atualizar especialidade!");
    }
  });

  return mutation
}
