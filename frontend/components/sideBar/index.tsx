'use client'

import { ChevronLeft, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { navigation } from "@/utils/constants/navigation";
import Image from "next/image";

export function Sidebar({role} : {role: string}) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filteredNavigation = navigation.filter(item => 
    !item.role || item.role.includes(role)
  );

  return (
    <div className={cn("flex h-screen flex-col border-r bg-card transition-all duration-300", isMenuOpen ? "w-16" : "w-64")}>
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isMenuOpen && (
          <div className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Clínica Escola"
              width={120}
              height={40}
              className="h-10 w-auto shrink-0"
            />
            <span className="text-lg font-semibold">Clinica escola</span>
          </div>
        )}
        <Button className="h-8 w-8" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <ChevronLeft className={cn("h-4 w-4 transition-transform", isMenuOpen ? "rotate-180" : "rotate-0")} />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {filteredNavigation.map((item) => {
          const isActive =
            pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href + '/'));

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2 font-medium transition-colors", 
                isActive
                  ? "bg-teal-600 text-white hover:bg-teal-700 focus-visible:ring-teal-500 dark:bg-primary-500 dark:text-white dark:hover:bg-primary-400"
                  : "text-muted-foreground hover:bg-accent hover:text-teal-700 dark:ho ",
                isMenuOpen && "justify-center")}
                title={isMenuOpen ? item.name : undefined}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!isMenuOpen && <span className="text-sm">{item.name}</span>}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}