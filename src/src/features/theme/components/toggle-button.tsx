"use client"

import * as React from "react"
import { Moon, MoonIcon, Sun, SunIcon, ComputerIcon, Computer, MonitorCogIcon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/loading/spinner"

export const ToggleThemeButton = () => {
  const [isLoad, setLoad] = React.useState(false);
  const { theme, setTheme } = useTheme()

  React.useEffect(() => {
    setLoad(true)
  }, [])

  if (!isLoad) return (
    <Button variant={"ghost"} size={"icon"} className="ml-auto" disabled>
      <Spinner className="text-sky-600"/>
    </Button> 
  )
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="ml-auto" suppressHydrationWarning>
          {theme === "light" && <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
          {theme === "dark" && <MoonIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
          {theme === "system" && <MonitorCogIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center" className="min-w-fit">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <SunIcon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <MoonIcon />
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <MonitorCogIcon />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
