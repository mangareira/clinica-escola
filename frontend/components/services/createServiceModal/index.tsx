"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Plus, Loader2 } from "lucide-react"

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
import { useCreateService } from "@/utils/hooks/services/useCreateService"
import {
  CreateServiceFormValues,
  createServiceSchema,
} from "@/utils/schemas/service.schemas"

export function CreateServiceModal() {
  const [open, setOpen] = useState(false)
  const createServiceMutation = useCreateService()

  const form = useForm<CreateServiceFormValues>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      type: "",
      price: 0,
    },
  })

  useEffect(() => {
    if (open) {
      form.reset()
    }
  }, [open, form])

  const onSubmit = async (data: CreateServiceFormValues) => {
    try {
      await createServiceMutation.mutateAsync(data)
      setOpen(false)
      form.reset()
    } catch (error) {
      console.error("Failed to create service:", error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus size={16} />
          Novo Serviço
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-xl">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-xl font-semibold">
            Novo Serviço
          </DialogTitle>
          <DialogDescription>
            Cadastre um novo serviço e defina seu valor.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 pt-4"
          >
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

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={createServiceMutation.isPending}
                className="gap-2"
              >
                {createServiceMutation.isPending && (
                  <Loader2 className="animate-spin" size={16} />
                )}
                {createServiceMutation.isPending
                  ? "Criando..."
                  : "Criar Serviço"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}