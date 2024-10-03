import { useContext, useEffect, useState } from "react";
import { TodoContext, TodoType } from "../context/TodoProvider";

const filterTodos = ({
    todos,
    filterCritery,
}: {
    todos: TodoType[];
    filterCritery: string;
}): TodoType[] => {
    if (filterCritery === "complete") {
        return todos.filter((todo) => todo.completed);
    }
    if (filterCritery === "incomplete") {
        return todos.filter((todo) => !todo.completed);
    }
    return todos;
};

const escapeRegExp = (string: string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

export const useSearchTodos = () => {
    const { state } = useContext(TodoContext);
    const { todos, searchValue, filterCritery } = state;

    const [displayedTodos, setDisplayedTodos] = useState<typeof todos>(todos);

    useEffect(() => {
        if (searchValue === "") setDisplayedTodos(todos);

        // Escape errors for special symbols like +, -, *, {, }.
        const escapedSearchValue = escapeRegExp(searchValue);
        const regex = new RegExp(escapedSearchValue, "i");
        const foundTodos = todos.filter((todo) => regex.test(todo.text));

        const filteredTodos = filterTodos({ todos: foundTodos, filterCritery });
        setDisplayedTodos(filteredTodos);
    }, [todos, searchValue, filterCritery]);

    return { displayedTodos };
};
