import { useContext } from "react";

import ManLookingIcon from "../../icons/ManLookingLightIcon";
import ManLookingDarkIcon from "../../icons/ManLookingDarkIcon";

import Todo from "./Todo";

import { ThemeContext } from "../../../context/ThemeProvider";
import { TodoType } from "../../../context/TodoProvider";
import { useSearchTodos } from "../../../hooks/useSearchTodos";

export default function Todos() {
    const { theme } = useContext(ThemeContext);
    const { displayedTodos } = useSearchTodos();

    return (
        <>
            {displayedTodos?.length === 0 && (
                <div>
                    {theme === "light" ? (
                        <ManLookingIcon
                            width={"221px"}
                            height={"174px"}
                            className="mx-auto"
                        />
                    ) : (
                        <ManLookingDarkIcon
                            width={"221px"}
                            height={"174px"}
                            className="mx-auto"
                        />
                    )}
                    <p className="text-center mt-4 font-normal text-lg font-sans">Empty...</p>
                </div>
            )}
            {displayedTodos?.length > 0 && (
                <div>
                    {displayedTodos?.map((todo: TodoType) => (
                        <Todo
                            key={todo.id}
                            todo={todo}
                        />
                    ))}
                </div>
            )}
        </>
    );
}
