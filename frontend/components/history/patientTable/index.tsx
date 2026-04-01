'use client'

import { useGetPatients } from "@/utils/hooks/patient/useGetPatients";
import { PatientCard } from "../patient";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { HistoryCard } from "..";
import { useMemo, useState } from "react";

const PatientCardSkeleton = () => {
  return (
    <Card className="rounded-2xl border bg-white shadow-sm transition mt-4">
      <CardContent className="flex flex-col gap-5 pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
          <div className="flex gap-2 flex-wrap justify-end">
            <Skeleton className="h-6 w-[80px] rounded-full" />
            <Skeleton className="h-6 w-[40px] rounded-full" />
            <Skeleton className="h-6 w-[60px] rounded-full" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-[120px]" />
            <Skeleton className="h-5 w-[100px]" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-[50px]" />
            <Skeleton className="h-6 w-[80px] rounded-full" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-3 w-[100px]" />
            <Skeleton className="h-5 w-[120px]" />
          </div>
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-[160px] rounded-md" />
        </div>
      </CardContent>
    </Card>
  )
}

export const PatientTable = () => {
  const { data: patients, isPending } = useGetPatients();

  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filteredPatients = useMemo(() => {
    if (!patients) return [];

    return patients.filter((patient) => {
      const matchesSearch = searchTerm === "" || 
        patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.phone?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = typeFilter === "all" || patient.type === typeFilter;

      return matchesSearch && matchesType;
    });
  }, [patients, searchTerm, typeFilter]);

  if (isPending) {
    return (
      <>
        <PatientCardSkeleton />
        <PatientCardSkeleton />
        <PatientCardSkeleton />
      </>
    )
  }

  return (
    <>
      <HistoryCard
        onSearchChange={setSearchTerm}
        onTypeChange={setTypeFilter}
        titlePlaceholder="Buscar por nome, telefone..."
      />
      {filteredPatients.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground mt-4 rounded-2xl border bg-white shadow-sm">
          <p>Nenhum paciente encontrado.</p>
        </div>
      ) : (
        filteredPatients.map((patient) => (
          <PatientCard key={patient.id} patient={patient} />
        ))
      )}
    </>
  )
}
