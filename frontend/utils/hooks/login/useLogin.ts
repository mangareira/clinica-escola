import api from "@/lib/axios"
import { Login } from "@/utils/schemas/login.schemas"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

export const useLogin = () => {
  const mutation = useMutation<void, Error, Login>({
    mutationFn: async (json) => {
      const res = await api.post("/login", json)
      if(res.status === 400) throw new Error("Error ao fazer o login") 
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso")
    },
    onError: () => {
      toast.error("Falha ao fazer o login")
    }
  })

  return mutation
}