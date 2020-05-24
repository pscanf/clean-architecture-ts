import React, { useState } from "react";

interface IProps {
    onCreateTodo(title: string): void;
}
export default function NewTodoInput(props: IProps) {
    const [title, setTitle] = useState("");
    return (
        <section>
            <input
                value={title}
                onChange={(evt) => setTitle(evt.target.value)}
            />
            &nbsp;
            <button
                onClick={() => {
                    props.onCreateTodo(title);
                    setTitle("");
                }}
            >
                {"Create Todo"}
            </button>
        </section>
    );
}
