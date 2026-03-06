import api from "@/lib/axios"
import { Login } from "@/utils/schemas/login.schemas"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"

export const useLogin = () => {
  const mutation = useMutation<void, Error, Login>({
    mutationFn: async (json) => {
      await api.post("/login", json)
    },
    onSuccess: () => {
      toast.success("Login realizado com sucesso")
    },
    onError: (error) => {
      if(axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message)
      }
    }
  })

  return mutation
}