import api from "@/lib/axios"
import { useMutation } from "@tanstack/react-query"
import { CreateSpecialtyFormValues, Specialty } from "@/utils/schemas/specialty.schemas"
import { toast } from "sonner";

export const useCreateSpecialty = () => {
  const mutation = useMutation({
    mutationFn: async (data: CreateSpecialtyFormValues) => {
      const response = await api.post<Specialty>("/specialties/create", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Especialidade criada com sucesso!");
    },
    onError: (error) => {
      console.error("Failed to create specialty:", error);
      toast.error("Erro ao criar especialidade!");
    }
  });

  return mutation
}
