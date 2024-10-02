import { useContext, useRef, useState } from "react";

import ChevronIcon from "../../icons/ChevronIcon";

import { TodoContext } from "../../../context/TodoProvider";
import { useOnClickOutside } from "usehooks-ts";

const FiltersDropdown = () => {
    const { dispatch } = useContext(TodoContext);

    const [isOpen, setIsOpen] = useState(false);

    const options = ["all", "complete", "incomplete"];
    const [selectedOption, setSelectedOption] = useState(options[0]);

    const handleOptionClick = (option: string) => {
        setSelectedOption(option);
        setIsOpen(false);
        dispatch({ type: "FILTER_TODOS", filterCritery: option });
    };

    const listRef = useRef(null);
    const handleClickOutside = () => {
        setIsOpen(false);
    };

    useOnClickOutside(listRef, handleClickOutside);

    return (
        <div
            className="relative inline-block text-left"
            ref={listRef}
        >
            <div>
                <button
                    type="button"
                    className="btn btn-primary w-full h-3 shadow-sm shadow-primary"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                >
                    <div className="flex gap-6 items-center justify-between">
                        <span className="uppercase text-lg font-medium text-primary-content">
                            {selectedOption}
                        </span>
                        <ChevronIcon
                            className={`ml-auto w-4 h-4 ${isOpen ? "rotate-180" : "rotate-0"}`}
                        />
                    </div>
                </button>
            </div>

            {isOpen && (
                <div className="absolute w-full rounded-md shadow-lg bg-primary-content border-primary border">
                    <ul>
                        {options.map((option) => (
                            <li
                                key={option}
                                className="cursor-pointer hover:bg-primary-transparent text-primary py-2 px-4 capitalize"
                                onClick={() => handleOptionClick(option)}
                            >
                                {option}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FiltersDropdown;
