import { Service } from "@/utils/schemas/service.schemas";
import { EditServiceFormValues } from "@/utils/schemas/specialty.schemas";
import { clsx, type ClassValue } from "clsx"
import { format, getDay, isBefore, isThisWeek, isToday, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function normalizeSpecialtiesForForm(
  specialties: Service['specialties']
): EditServiceFormValues['specialties'] {
  if (!specialties) return null;

  return specialties.map((specialty) => ({
    id: specialty.id,
    name: specialty.name,
    serviceId: specialty.serviceId ?? undefined,
    demands: specialty.demands?.map((demand) => ({
      id: demand.id,
      name: demand.name,
      specialtyId: demand.specialtyId ?? undefined,
    })),
  }));
}
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function convertAmountFromMiliunitis(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunitis(amount: string) {
    const cleanValue = amount
    .replace(/\./g, '') 
    .replace(',', '.');     
  
  const amountConverted = parseFloat(cleanValue);

  return Math.round(amountConverted * 1000)
}

export const formatPhone = (phone: string | undefined | null) => {
  if (!phone) return "Não informado";
  
  const cleaned = phone.replace(/\D/g, "");
  
  if (cleaned.length === 11) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`;
  } else if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`;
  }
  
  return phone;
}

export const formatDateTime = (date: string | Date): string => {
  const appointmentDate = new Date(date);

  if (isThisWeek(appointmentDate)) {
    return format(appointmentDate, "EEEE: HH:mm", { locale: ptBR });
  } else {
    return format(appointmentDate, "dd/MM/yyyy, HH:mm", { locale: ptBR });
  }
};

export const getDayOfWeek = (date: Date): number => {
  return getDay(new Date(date));
};

export const isWeekday = (appointmentDate: Date): boolean => {
  const dayOfWeek = getDayOfWeek(appointmentDate);
  return dayOfWeek >= 1 && dayOfWeek <= 5;
};

export const getDayNamePt = (dayOfWeek: number): string => {
  const days = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
  return days[dayOfWeek];
};

export const validateCheckInEligibility = (appointmentDate: Date): { canCheckIn: boolean; reason?: string } => {
  const appointmentDateObj = new Date(appointmentDate);
  const today = new Date();
  
  if (isBefore(startOfDay(appointmentDateObj), startOfDay(today))) {
    return {
      canCheckIn: false,
      reason: 'Agendamento já passou'
    };
  }

  if (!isWeekday(appointmentDateObj)) {
    const dayName = getDayNamePt(getDayOfWeek(appointmentDateObj));
    return {
      canCheckIn: false,
      reason: `Agendamento marcado para ${dayName}. Sessões são apenas de segunda a sexta.`
    };
  }


  if (!isToday(appointmentDateObj)) {
    const dayName = getDayNamePt(getDayOfWeek(appointmentDateObj));
    return {
      canCheckIn: false,
      reason: `Agendamento marcado para ${dayName}. Check-in disponível apenas no dia do agendamento.`
    };
  }

  return { canCheckIn: true };
};

export const formatAppointmentWithDayName = (appointmentDate: Date): string => {
  const dayOfWeek = getDayOfWeek(new Date(appointmentDate));
  const dayName = getDayNamePt(dayOfWeek);
  const date = new Date(appointmentDate);
  const formattedDate = date.toLocaleDateString('pt-BR');
  
  return `${dayName} (${formattedDate})`;
};