import PlusIcon from "../icons/PlusIcon";

export default function AddTaskFab() {
    return (
        <div>
            <button className="btn btn-circle bg-primary outline-none outline-offset-0 border-none shadow-sm shadow-primary hover:bg-primary-darker hover:outline-3 hover:outline-primary">
                <PlusIcon className="w-6 h-6 fill-white" />
            </button>
        </div>
    );
}
