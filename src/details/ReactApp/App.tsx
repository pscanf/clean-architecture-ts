import React, { useState, useEffect } from "react";
import { ITodo } from "../../core/entities/Todo";
import NewTodoInput from "./NewTodoInput";
import TodoList from "./TodoList";

interface IProps {
    listTodos(): Promise<ITodo[]>;
    createTodo(title: string): Promise<ITodo>;
    doTodo(id: string): Promise<ITodo>;
}
export default function App(props: IProps) {
    const [todos, setTodos] = useState([] as ITodo[]);

    const getTodosList = async () => {
        setTodos(await props.listTodos());
    };
    const handleCreateTodo = async (title: string) => {
        await props.createTodo(title);
        await getTodosList();
    };
    const handleDoTodo = async (id: string) => {
        await props.doTodo(id);
        await getTodosList();
    };

    useEffect(() => {
        getTodosList();
    }, []);

    return (
        <main>
            <TodoList todos={todos} onDoTodo={handleDoTodo} />
            <NewTodoInput onCreateTodo={handleCreateTodo} />
        </main>
    );
}
