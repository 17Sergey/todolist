import { ChangeEvent, useContext, useState } from "react";

import SearchIcon from "../../icons/SearchIcon";

import { ThemeContext } from "../../../context/ThemeProvider";
import { TodoContext } from "../../../context/TodoProvider";

export default function SearchBar() {
    const { dispatch } = useContext(TodoContext);
    const { theme } = useContext(ThemeContext);

    const [searchValue, setSearchValue] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        dispatch({ type: "SEARCH_TODOS", searchValue: e.target.value });
    };

    return (
        <>
            <label
                className={`input input-bordered border flex items-center gap-2 w-full focus-within:outline-offset-1 ${
                    theme === "light"
                        ? "focus-within:border-primary focus-within:outline-primary-transparent border-primary"
                        : "focus-within:border-primary-content focus-within:outline-primary-content-transparent border-primary-content"
                }`}
            >
                <input
                    type="text"
                    value={searchValue}
                    onChange={handleInputChange}
                    className={`grow font-serif font-medium text-base ${
                        theme === "light" ? "text-primary" : "text-primary-content"
                    }`}
                    placeholder="Search note..."
                />
                <SearchIcon
                    className={`h-6 w-6 ${
                        theme === "light" ? "fill-primary" : "fill-primary-content"
                    }`}
                />
            </label>
        </>
    );
}
