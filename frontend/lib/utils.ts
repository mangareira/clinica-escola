import { Service } from "@/utils/schemas/service.schemas";
import { EditServiceFormValues } from "@/utils/schemas/specialty.schemas";
import { clsx, type ClassValue } from "clsx"
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