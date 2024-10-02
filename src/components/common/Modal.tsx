import { ComponentProps, RefObject, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";

type ModalProps = {
    modalRef: RefObject<HTMLDialogElement>;
    closeCallback?: () => void;
} & ComponentProps<"dialog">;

export default function Modal({
    className,
    children,
    modalRef,
    closeCallback = () => {},
}: ModalProps) {
    const handleClickOutside = () => {
        modalRef?.current?.close();
        closeCallback();
    };

    const modalBox = useRef(null);
    useOnClickOutside(modalBox, handleClickOutside);

    return (
        <dialog
            id="new_note_modal"
            className="modal cursor-pointer"
            ref={modalRef}
        >
            <div
                ref={modalBox}
                className={`modal-box py-4 px-8 mx-2 w-4/5 max-w-xl cursor-default ${className}`}
            >
                {children}
            </div>
        </dialog>
    );
}

Modal.Title = ({ className, children }: ComponentProps<"h3">) => (
    <h3 className={`font-semibold text-2xl uppercase ${className}`}>{children}</h3>
);
Modal.AcceptBtn = ({ onClick, className, children }: ComponentProps<"button">) => (
    <button
        onClick={onClick}
        className={`btn btn-primary text-lg font-medium uppercase ${className}`}
    >
        {children}
    </button>
);
Modal.RejectBtn = ({ onClick, className, children }: ComponentProps<"button">) => (
    <button
        onClick={onClick}
        className={`btn btn-primary bg-transparent hover:text-primary-content px-8 text-primary  text-lg font-medium py-2 border-primary uppercase ${className}`}
    >
        {children}
    </button>
);
