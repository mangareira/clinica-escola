import { useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import { Control } from "react-hook-form";
import { EditServiceFormValues } from "@/utils/schemas/specialty.schemas";

export function DemandsFieldArray({ control, specIndex }: { control: Control<EditServiceFormValues>; specIndex: number }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `specialties.${specIndex}.demands`
  });

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <FormLabel className="flex items-center gap-2">
          Demandas
        </FormLabel>
        <Button 
          type="button" 
          variant="secondary" 
          size="sm" 
          className="h-7 text-xs gap-1"
          onClick={() => append({ name: "" })}
        >
          <Plus size={12} /> Nova Demanda
        </Button>
      </div>

      <div className="space-y-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <FormField
              control={control}
              name={`specialties.${specIndex}.demands.${index}.name`}
              render={({ field: inputField }) => (
                <FormItem className="flex-1 space-y-0">
                  <FormControl>
                    <Input 
                      placeholder="Nome da demanda" 
                      className="h-9"
                      {...inputField} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs pt-1 mt-0" />
                </FormItem>
              )}
            />
            <Button 
              type="button" 
              variant="ghost" 
              size="icon" 
              className="h-9 w-9 shrink-0 text-muted-foreground hover:text-destructive"
              onClick={() => remove(index)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
        {fields.length === 0 && (
          <p className="text-xs text-muted-foreground italic">
            Nenhuma demanda definida para esta especialidade.
          </p>
        )}
      </div>
    </div>
  )
}
