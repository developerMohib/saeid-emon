"use client"
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeChanger = () => {
    const [isDark, setIsDark] = useState<boolean>(false)

    const handleTheme = () => {
        setIsDark(!isDark)
        if (isDark) {
            document.documentElement.setAttribute("data-theme", "light")
            localStorage.setItem("theme", "light")
        } else {
            document.documentElement.setAttribute("data-theme", "dark")
            localStorage.setItem("theme", "dark")
        }
    }
    // save theme data in local storage 
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
        if (savedTheme === "dark") {
            setIsDark(true)
            document.documentElement.setAttribute("data-theme", "dark")
        } else {

            document.documentElement.setAttribute("data-theme", "light")
        }
    }, [])

    return (
        <button className='rounded-full shadow-lg cursor-pointer'
            onClick={handleTheme}>
            {isDark ? <Moon className="text-base text-seGreen" /> : <Sun className="text-base text-seRed" />}
        </button>
    );
};

export default ThemeChanger;