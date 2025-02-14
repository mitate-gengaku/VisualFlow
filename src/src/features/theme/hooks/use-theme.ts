import { themeAtom } from "@/store/theme";
import { ColorMode } from "@xyflow/react";
import { useSetAtom } from "jotai";
import { useTheme as useNextTheme } from "next-themes"
import { useEffect } from "react";

export const useTheme = () => {
  const setTheme = useSetAtom(themeAtom);
  const { theme, setTheme: setNextTheme } = useNextTheme();

  const onCustomTheme = (theme: ColorMode) => {
    setNextTheme(theme);
    setTheme(theme)
  }

  useEffect(() => {
    if(!theme) return;
    setTheme(theme as ColorMode)
  }, []);

  return {
    theme,
    onCustomTheme
  }
}