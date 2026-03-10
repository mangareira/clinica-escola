'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';

export function ModeToggle() {
  const { theme, setTheme, systemTheme } = useTheme();
  const pathName = usePathname()

  const currentTheme = theme === 'system' ? systemTheme : theme;

  function toggleTheme() {
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  }

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme} className={cn("absolute top-1 right-1", pathName !== '/login' ? "hidden" : "")}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
