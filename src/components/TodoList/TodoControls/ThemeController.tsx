import { useContext } from "react";

import SunIcon from "../../icons/SunIcon";
import MoonIcon from "../../icons/MoonIcon";

import { ThemeContext } from "../../../context/ThemeProvider";

export default function ThemeController() {
    const { theme: appTheme, changeTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        changeTheme(appTheme === "dark" ? "light" : "dark");
    };

    return (
        <div>
            <label className="swap swap-rotate bg-primary hover:bg-primary-darker hover:shadow-sm hover:shadow-primary p-1 h-12 w-12 rounded-lg">
                <input
                    type="checkbox"
                    onClick={toggleTheme}
                    className="theme-controller"
                    value="synthwave"
                />

                <SunIcon className="swap-on h-6 w-6 fill-[#F7F7F7]" />
                <MoonIcon className="swap-off h-6 w-6  fill-[#F7F7F7]" />
            </label>
        </div>
    );
}
