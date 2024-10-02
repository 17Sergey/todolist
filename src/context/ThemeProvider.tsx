/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({ theme: "light", changeTheme: (_theme: string) => {} });

const findPreferedTheme = (): string => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    return prefersDarkScheme.matches ? "dark" : "light";
};

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
    const defaultTheme = findPreferedTheme();
    const [theme, setTheme] = useState<string>(defaultTheme);

    useEffect(() => {
        changeTheme(theme);
    }, [theme]);

    const changeTheme = (theme: string) => {
        document?.querySelector("html")?.setAttribute("data-theme", theme);
        setTheme(theme);
    };

    const value = { theme, changeTheme };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
