import { useContext, useState } from "react";

import EditIcon from "../../icons/EditIcon";
import TrashIcon from "../../icons/TrashIcon";

import EditTodoModal from "../Modals/EditTodoModal";

import { useModal } from "../../../hooks/useModal";
import { TodoContext, TodoType } from "../../../context/TodoProvider";

export default function Todo({ todo }: { todo: TodoType }) {
    const { dispatch } = useContext(TodoContext);

    const [isCompleted, setIsCompleted] = useState(todo.completed);

    const setCompleted = () => {
        dispatch({ type: "EDIT_TODO", updatedTodo: { ...todo, completed: !isCompleted } });
        setIsCompleted(!isCompleted);
    };

    const { modalRef: editModalRef, openModal: openEditModalCallback } = useModal();

    const openEditModal = () => {
        openEditModalCallback();
    };

    const handleDelete = () => {
        dispatch({ type: "DELETE_TODO", id: todo.id });
    };

    return (
        <div className="flex items-start gap-4 py-4 border-b-[1px] last:border-b-0 border-b-primary">
            <form className="form-control">
                <label className="label cursor-pointer">
                    <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={setCompleted}
                        className="checkbox checkbox-primary w-6 h-6"
                    />
                </label>
            </form>
            <div className="relative top-[5px] flex justify-between items-start gap-4 w-full">
                <p
                    className={`font-medium font-sans uppercase text-xl cursor-pointer ${
                        isCompleted && "line-through text-[--theme-accent] opacity-50"
                    }`}
                    onClick={setCompleted}
                >
                    {todo.text}
                </p>
                <div className="flex gap-4 items-center">
                    <div>
                        <EditIcon
                            className="w-5 h-5 cursor-pointer transition-colors stroke-light-gray hover:stroke-primary"
                            onClick={openEditModal}
                        />
                        <EditTodoModal
                            todo={todo}
                            modalRef={editModalRef}
                        />
                    </div>
                    <div>
                        <TrashIcon
                            className="w-6 h-6 cursor-pointer transition-colors stroke-light-gray hover:stroke-error"
                            onClick={handleDelete}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
