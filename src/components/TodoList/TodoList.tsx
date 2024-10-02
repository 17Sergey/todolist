import AddTaskFab from "./AddTaskFab";
import NewTodoModal from "./Modals/NewTodoModal";
import Todos from "./Tasks/Todos";
import TodoControls from "./TodoControls/TodoControls";

import { useModal } from "../../hooks/useModal";
import TodoProvider from "../../context/TodoProvider";

export default function TodoList() {
    const { modalRef: newNoteModalRef, openModal } = useModal();

    return (
        <TodoProvider>
            <div className="relative w-4/5 max-w-[750px] min-h-screen mx-auto my-0 pt-10">
                <h1 className="text-2xl text-center font-medium text-base-content">TODO LIST</h1>
                <div className="mt-4">
                    <TodoControls />
                    <div className="mt-4 max-w-[520px] max-h-[500px] overflow-y-auto scroll-m-10 mx-auto px-4">
                        <Todos />
                    </div>
                    <div
                        className="absolute bottom-8 right-2"
                        onClick={openModal}
                    >
                        <AddTaskFab />
                    </div>
                    <NewTodoModal modalRef={newNoteModalRef} />
                </div>
            </div>
        </TodoProvider>
    );
}
