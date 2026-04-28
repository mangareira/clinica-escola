import api from "@/lib/axios"
import { Appointment } from "@/utils/interfaces/appointments.interface"
import { useQuery } from "@tanstack/react-query"

export const useGetAppointments = () => {
  const query = useQuery<Appointment[], Error>({
    queryKey: ["appointments"],
    queryFn: async () => {
      const response = await api.get("/appointments/get-all")
      return response.data
    }
  })

  return query
}
