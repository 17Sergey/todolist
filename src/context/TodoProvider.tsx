import React, { createContext, useEffect, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";

export type TodoType = {
    id: string;
    text: string;
    completed: boolean;
};

type State = {
    todos: TodoType[];
    searchValue: string;
    filterCritery: string;
};

type Action =
    | { type: "ADD_TODO"; text: string }
    | { type: "EDIT_TODO"; updatedTodo: TodoType }
    | { type: "DELETE_TODO"; id: string }
    | { type: "SEARCH_TODOS"; searchValue: string }
    | { type: "FILTER_TODOS"; filterCritery: string }
    | { type: "LOAD_TODOS"; todos: TodoType[] };

const loadTodosFromLocalStorage = (): TodoType[] => {
    try {
        const storedTodos = localStorage.getItem("todos");
        return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (error) {
        console.error("Error loading todos from localStorage:", error);
        return [];
    }
};

const saveTodosToLocalStorage = (todos: TodoType[]) => {
    try {
        localStorage.setItem("todos", JSON.stringify(todos));
    } catch (error) {
        console.error("Error saving todos to localStorage:", error);
    }
};

const initialState: State = {
    todos: [],
    searchValue: "",
    filterCritery: "all",
};

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "LOAD_TODOS":
            return { ...state, todos: action.todos };
        case "ADD_TODO": {
            const newTodo = { text: action.text, id: uuidv4(), completed: false };
            const updatedTodos = [...state.todos, newTodo];
            saveTodosToLocalStorage(updatedTodos);
            return { ...state, todos: updatedTodos };
        }
        case "EDIT_TODO": {
            const updatedTodosEdit = state.todos.map((todo) =>
                todo.id === action.updatedTodo.id ? action.updatedTodo : todo
            );
            saveTodosToLocalStorage(updatedTodosEdit);
            return { ...state, todos: updatedTodosEdit };
        }
        case "DELETE_TODO": {
            const updatedTodosDelete = state.todos.filter((todo) => todo.id !== action.id);
            saveTodosToLocalStorage(updatedTodosDelete);
            return { ...state, todos: updatedTodosDelete };
        }
        case "SEARCH_TODOS":
            return { ...state, searchValue: action.searchValue };
        case "FILTER_TODOS":
            return { ...state, filterCritery: action.filterCritery };
        default:
            return state;
    }
};

export const TodoContext = createContext<{
    state: State;
    dispatch: React.Dispatch<Action>;
}>({
    state: initialState,
    dispatch: () => null,
});

export default function TodoProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const loadedTodos = loadTodosFromLocalStorage();
        dispatch({ type: "LOAD_TODOS", todos: loadedTodos });
    }, []);

    const value = {
        state,
        dispatch,
    };

    return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
}
