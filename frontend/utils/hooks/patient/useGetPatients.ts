import api from "@/lib/axios"
import { useQuery } from "@tanstack/react-query"
import { PatientHistory } from "@/utils/interfaces/history-type.interface"

export const useGetPatients = () => {
  const query = useQuery<PatientHistory[], Error>({
    queryKey: ["patients"],
    queryFn: async () => {
      const response = await api.get("/patient/get-all")
      return response.data
    }
  })

  return query
}
