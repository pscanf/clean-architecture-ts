import React from "react";

import { ITodo } from "../../core/entities/Todo";

interface IProps {
    todos: ITodo[];
    onDoTodo(id: string): void;
}
export default class TodoList extends React.Component<IProps> {
    render() {
        const { todos, onDoTodo } = this.props;
        return (
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} onClick={() => onDoTodo(todo.id)}>
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
}
