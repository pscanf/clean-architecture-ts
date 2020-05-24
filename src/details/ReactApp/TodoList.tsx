import React from "react";
import { ITodo } from "../../core/entities/Todo";

interface IProps {
    todos: ITodo[];
    onDoTodo(id: string): void;
}
export default function TodoList(props: IProps) {
    return (
        <ul>
            {props.todos.map((todo) => (
                <li key={todo.id} onClick={() => props.onDoTodo(todo.id)}>
                    <input
                        type="checkbox"
                        checked={todo.isDone}
                        readOnly={true}
                    />
                    &nbsp;
                    {todo.title}
                </li>
            ))}
        </ul>
    );
}
