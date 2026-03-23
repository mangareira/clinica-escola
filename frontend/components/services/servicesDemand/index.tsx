"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { useGetServices } from "@/utils/hooks/services/useGetServices"

export const Services = () => {
  const { data: services } = useGetServices()

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {services?.map((service, i) => (
        <Card
          key={i}
          className="group transition-all hover:shadow-xl hover:-translate-y-1 border-muted/60"
        >
          <CardHeader className="flex flex-row items-start justify-between">
            <div>
              <CardTitle className="text-lg">
                {service.type}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                R$ {service.price.toFixed(2)} por sessão
              </p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
              <Button size="icon" variant="ghost">
                <Pencil size={16} />
              </Button>
              <Button size="icon" variant="ghost">
                <Trash2 size={16} />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {service.specialties?.map((specialty, index) => (
              <div
                key={index}
                className="p-3 rounded-lg border bg-muted/40"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-sm">
                    {specialty.name}
                  </span>
                  <Badge variant="secondary">
                    {specialty.demands?.length} demanda{specialty.demands?.length !== 1 ? "s" : ""}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-2">
                  {specialty.demands?.map((d, i) => (
                    <Badge key={i} variant="outline">
                      {d.name}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
