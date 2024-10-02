import { ChangeEvent, KeyboardEvent, RefObject, useContext, useState } from "react";

import Modal from "../../common/Modal";

import { ThemeContext } from "../../../context/ThemeProvider";
import { TodoContext, TodoType } from "../../../context/TodoProvider";

export default function EditTodoModal({
    todo,
    modalRef,
}: {
    todo: TodoType;
    modalRef: RefObject<HTMLDialogElement>;
}) {
    const { dispatch } = useContext(TodoContext);
    const { theme } = useContext(ThemeContext);

    const [text, setText] = useState(todo?.text);

    const [error, setError] = useState<string | null>(null);

    const updateText = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(null);
        setText(e.target.value);
    };

    const saveTodo = () => {
        if (!text) {
            setError("New task must not be empty");
            return;
        }
        dispatch({ type: "EDIT_TODO", updatedTodo: { ...todo, text } });
        closeModal();
    };

    const closeModal = () => {
        modalRef?.current?.close();
        setError("");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            saveTodo();
        }
    };
    return (
        <div>
            <Modal
                modalRef={modalRef}
                closeCallback={closeModal}
                className={`min-h-72 ${theme === "dark" && "border-primary-content border"}
                }`}
            >
                <div className={`h-full flex-col justify-between`}>
                    <Modal.Title className="text-center uppercase">Edit note</Modal.Title>
                    <label>
                        <input
                            type="text"
                            placeholder="Input your note..."
                            value={text}
                            onChange={updateText}
                            onKeyDown={handleKeyDown}
                            className={`input input-bordered border focus-within:outline-none font-serif font-medium w-full mt-6 outline-offset-0 ${
                                theme === "light"
                                    ? "border-primary focus:border-primary text-primary"
                                    : "border-primary-content focus:border-primary-content text-primary-content"
                            }`}
                        />
                        <span className="text-error">{error}</span>
                    </label>
                    <div className="flex justify-between items-center mt-24">
                        <Modal.RejectBtn onClick={closeModal}>Cancel</Modal.RejectBtn>
                        <Modal.AcceptBtn onClick={saveTodo}>Save</Modal.AcceptBtn>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
