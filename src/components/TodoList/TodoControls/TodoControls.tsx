import SearchBar from "./SearchBar";
import FiltersDropdown from "./FiltersDropdown";
import ThemeController from "./ThemeController";

export default function TodoControls() {
    return (
        <form>
            <div className="flex items-center justify-between gap-4">
                <SearchBar />
                <FiltersDropdown />
                <ThemeController />
            </div>
        </form>
    );
}
