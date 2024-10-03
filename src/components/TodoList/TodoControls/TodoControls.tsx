import SearchBar from "./SearchBar";
import FiltersDropdown from "./FiltersDropdown";
import ThemeController from "./ThemeController";
import { FormEvent } from "react";

export default function TodoControls() {
    return (
        <form onSubmit={(e: FormEvent) => e.preventDefault()}>
            <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-4">
                <SearchBar />
                <FiltersDropdown />
                <ThemeController />
            </div>
        </form>
    );
}
