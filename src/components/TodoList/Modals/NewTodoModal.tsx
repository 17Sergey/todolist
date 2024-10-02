import { ChangeEvent, KeyboardEvent, RefObject, useContext, useState } from "react";

import Modal from "../../common/Modal";

import { ThemeContext } from "../../../context/ThemeProvider";
import { TodoContext } from "../../../context/TodoProvider";

export default function NewNoteModal({ modalRef }: { modalRef: RefObject<HTMLDialogElement> }) {
    const { dispatch } = useContext(TodoContext);
    const { theme } = useContext(ThemeContext);

    const [text, setText] = useState("");
    const [error, setError] = useState<string | null>(null);

    const updateText = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) setError(null);
        setText(e.target.value);
    };

    const createTodo = () => {
        if (!text) {
            setError("New task must not be empty");
            return;
        }
        dispatch({ type: "ADD_TODO", text });
        closeModal();
    };

    const closeModal = () => {
        modalRef?.current?.close();
        setText("");
        setError("");
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
            createTodo();
        }
    };
    return (
        <div>
            <Modal
                modalRef={modalRef}
                closeCallback={closeModal}
            >
                <div className="flex-col justify-between">
                    <Modal.Title className="text-center">New Note</Modal.Title>
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
                        <Modal.AcceptBtn onClick={createTodo}>Apply</Modal.AcceptBtn>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
