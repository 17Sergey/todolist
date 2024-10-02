import { ComponentProps } from "react";

export default function ChevronIcon({ ...props }: ComponentProps<"svg">) {
    return (
        <svg
            viewBox="0 0 9 5"
            {...props}
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M4.63086 4L1.26163 1"
                stroke="#F7F7F7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M8 1L4.63077 4"
                stroke="#F7F7F7"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}
