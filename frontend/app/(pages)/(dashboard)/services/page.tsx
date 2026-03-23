import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { Services } from "@/components/services/servicesDemand"


export default function ServicesPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">
            Serviços
          </h1>
          <p className="text-muted-foreground text-sm">
            Gerencie especialidades, demandas e valores da clínica
          </p>
        </div>

        <Button className="gap-2">
          <Plus size={16} />
          Novo Serviço
        </Button>
      </div>

      <Services />
    </div>
  )
}