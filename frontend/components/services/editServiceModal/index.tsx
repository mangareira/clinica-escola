"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Pencil, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  EditServiceFormValues,
  editServiceSchema,
} from "@/utils/schemas/specialty.schemas"
import { Service } from "@/utils/schemas/service.schemas"
import { normalizeSpecialtiesForForm } from "@/lib/utils"
import { AddSpecialityToService } from "@/components/specialities/addSpecialityToService"
import { useEditServiceSubmit } from "./useEditServiceSubmit"

interface EditServiceModalProps {
  service: Service
}

export function EditServiceModal({ service }: EditServiceModalProps) {
  const [open, setOpen] = useState(false)

  const form = useForm<EditServiceFormValues>({
    resolver: zodResolver(editServiceSchema),
    defaultValues: {
      ...service,
      specialties: normalizeSpecialtiesForForm(service.specialties),
    },
  })

  const { onSubmit, isPending } = useEditServiceSubmit({ service, setOpen, form })

  const { 
    fields: specialtyFields, 
    append: appendSpecialty, 
    remove: removeSpecialty 
  } = useFieldArray({
    control: form.control,
    name: "specialties",
  })

  useEffect(() => {
    if (open) {
      form.reset({
        ...service,
        specialties: normalizeSpecialtiesForForm(service.specialties),
      })
    }
  }, [open, service, form])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <Pencil size={16} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto rounded-xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Editar Serviço
          </DialogTitle>
          <DialogDescription>
            Edite os detalhes do serviço ou adicione novas especialidades e demandas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 pt-4"
          >
            <div className="flex flex-col gap-4 bg-muted/20 p-4 rounded-lg border">
              <h3 className="font-medium text-sm text-foreground/80">Detalhes Gerais</h3>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de Serviço</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ex: Consulta Psicológica"
                        className="focus-visible:ring-2 focus-visible:ring-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Valor (R$)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-2.5 text-muted-foreground text-sm">
                          R$
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          placeholder="0,00"
                          className="pl-8 focus-visible:ring-2 focus-visible:ring-primary"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <AddSpecialityToService 
              control={form.control} 
              appendSpecialty={appendSpecialty} 
              removeSpecialty={removeSpecialty} 
              specialtyFields={specialtyFields} 
              service={service} 
            />

            <div className="flex justify-end gap-2 pt-4 border-t">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isPending}
                className="gap-2"
              >
                {isPending && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                {isPending ? "Salvando..." : "Salvar Alterações"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}