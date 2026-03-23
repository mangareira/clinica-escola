import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { Service } from "@/utils/schemas/service.schemas"

export const useGetServices = () => {
  const query = useQuery<Service[], Error>({
    queryKey: ["services"],
    queryFn: async () => {
      const response = await api.get("/services/get-all")
      return response.data
    }
  })

  return query
}
