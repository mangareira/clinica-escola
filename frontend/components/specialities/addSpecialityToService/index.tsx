import { Control } from "react-hook-form"
import { EditServiceFormValues } from "@/utils/schemas/specialty.schemas"
import { DemandsFieldArray } from "@/components/demand/demandFieldArray"
import { Button } from "@/components/ui/button"
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Plus, Trash2 } from "lucide-react"

export function AddSpecialityToService({ control, appendSpecialty, removeSpecialty, specialtyFields, service }: { control: Control<EditServiceFormValues>; appendSpecialty: (value: any) => void; removeSpecialty: (value: number) => void; specialtyFields: any[]; service: any }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-foreground/80">Adicionar Novas Especialidades</h3>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          className="gap-2"
          onClick={() => appendSpecialty({ name: "", demands: [], serviceId: service.id })}
        >
          <Plus size={14} /> Nova Especialidade
        </Button>
      </div>

      {specialtyFields.map((specField, specIndex) => (
        <div key={specField.id} className="p-4 border rounded-lg bg-card space-y-4 relative">
          <Button 
            type="button"
            variant="ghost" 
            size="icon" 
            className="absolute right-2 top-2 text-destructive hover:text-destructive hover:bg-destructive/10"
            onClick={() => removeSpecialty(specIndex)}
          >
            <Trash2 size={16} />
          </Button>

          <FormField
            control={control}
            name={`specialties.${specIndex}.name`}
            render={({ field }) => (
              <FormItem className="pr-10">
                <FormLabel>Nome da Especialidade</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Ex: Psicologia Infantil" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2 pl-4 border-l-2 space-y-3">
            <DemandsFieldArray control={control} specIndex={specIndex} />
          </div>
        </div>
      ))}
      
      {specialtyFields.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-lg">
          Nenhuma especialidade a ser adicionada.
        </p>
      )}
    </div>
  )
}
