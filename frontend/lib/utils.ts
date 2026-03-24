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