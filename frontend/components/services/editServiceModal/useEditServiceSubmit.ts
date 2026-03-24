import { useQueryClient } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { useUpdateService } from "@/utils/hooks/services/useUpdateService";
import { useCreateSpecialty } from "@/utils/hooks/specialties/useCreateSpecialty";
import { useUpdateSpecialty } from "@/utils/hooks/specialties/useUpdateSpecialty";
import { useDeleteSpecialty } from "@/utils/hooks/specialties/useDeleteSpecialty";
import { useCreateDemand } from "@/utils/hooks/demands/useCreateDemand";
import { useUpdateDemand } from "@/utils/hooks/demands/useUpdateDemand";
import { useDeleteDemand } from "@/utils/hooks/demands/useDeleteDemand";
import { EditServiceFormValues } from "@/utils/schemas/specialty.schemas";
import { Service } from "@/utils/schemas/service.schemas";

interface UseEditServiceSubmitProps {
  service: Service;
  setOpen: (open: boolean) => void;
  form: UseFormReturn<EditServiceFormValues>;
}

type Specialty = NonNullable<Service["specialties"]>[number];
type Demand = NonNullable<Specialty["demands"]>[number];

async function syncDemands(
  originalDemands: Demand[],
  newDemands: NonNullable<EditServiceFormValues["specialties"]>[number]["demands"],
  specialtyId: string,
  mutations: {
    createDemand: ReturnType<typeof useCreateDemand>;
    updateDemand: ReturnType<typeof useUpdateDemand>;
    deleteDemand: ReturnType<typeof useDeleteDemand>;
  }
) {
  const { createDemand, updateDemand, deleteDemand } = mutations;

  const demandsToDelete = originalDemands.filter(
    (orig) => !newDemands?.some((newDem) => newDem.id === orig.id)
  );

  await Promise.all(
    demandsToDelete.map((demand) => deleteDemand.mutateAsync(demand.id))
  );

  for (const demand of newDemands || []) {
    if (!demand.id) {
      await createDemand.mutateAsync({
        name: demand.name,
        specialtyId,
      });
    } else {
      await updateDemand.mutateAsync({
        id: demand.id,
        name: demand.name,
      });
    }
  }
}

async function syncSpecialties(
  originalSpecialties: Specialty[],
  newSpecialties: EditServiceFormValues["specialties"],
  serviceId: string,
  mutations: {
    createSpecialty: ReturnType<typeof useCreateSpecialty>;
    updateSpecialty: ReturnType<typeof useUpdateSpecialty>;
    deleteSpecialty: ReturnType<typeof useDeleteSpecialty>;
    createDemand: ReturnType<typeof useCreateDemand>;
    updateDemand: ReturnType<typeof useUpdateDemand>;
    deleteDemand: ReturnType<typeof useDeleteDemand>;
  }
) {
  const { createSpecialty, updateSpecialty, deleteSpecialty, ...demandMutations } = mutations;

  const specialtiesToDelete = originalSpecialties.filter(
    (orig) => !newSpecialties?.some((newSpec) => newSpec.id === orig.id)
  );

  await Promise.all(
    specialtiesToDelete.map((spec) => deleteSpecialty.mutateAsync(spec.id))
  );

  for (const newSpec of newSpecialties || []) {
    let currentSpecialtyId = newSpec.id;

    if (!currentSpecialtyId) {
      const created = await createSpecialty.mutateAsync({
        name: newSpec.name,
        serviceId,
      });
      currentSpecialtyId = created.id;
    } else {
      await updateSpecialty.mutateAsync({
        id: currentSpecialtyId,
        name: newSpec.name,
      });
    }

    const originalSpec = originalSpecialties.find((s) => s.id === currentSpecialtyId);
    const originalDemands = originalSpec?.demands || [];

    await syncDemands(originalDemands, newSpec.demands, currentSpecialtyId, demandMutations);
  }
}

export function useEditServiceSubmit({ service, setOpen, form }: UseEditServiceSubmitProps) {
  const queryClient = useQueryClient();

  const updateServiceMutation = useUpdateService();
  const createSpecialtyMutation = useCreateSpecialty();
  const updateSpecialtyMutation = useUpdateSpecialty();
  const deleteSpecialtyMutation = useDeleteSpecialty();
  const createDemandMutation = useCreateDemand();
  const updateDemandMutation = useUpdateDemand();
  const deleteDemandMutation = useDeleteDemand();

  const isPending =
    updateServiceMutation.isPending ||
    createSpecialtyMutation.isPending ||
    updateSpecialtyMutation.isPending ||
    deleteSpecialtyMutation.isPending ||
    createDemandMutation.isPending ||
    updateDemandMutation.isPending ||
    deleteDemandMutation.isPending;

  const onSubmit = async (data: EditServiceFormValues) => {
    try {
      await updateServiceMutation.mutateAsync({
        id: data.id,
        type: data.type,
        price: data.price,
      });

      const originalSpecialties = service.specialties || [];
      const newSpecialties = data.specialties || [];

      await syncSpecialties(originalSpecialties, newSpecialties, data.id, {
        createSpecialty: createSpecialtyMutation,
        updateSpecialty: updateSpecialtyMutation,
        deleteSpecialty: deleteSpecialtyMutation,
        createDemand: createDemandMutation,
        updateDemand: updateDemandMutation,
        deleteDemand: deleteDemandMutation,
      });

      setOpen(false);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["services"] });
    } catch (error) {
      console.error("Failed to update service:", error);
    }
  };

  return { onSubmit, isPending };
}