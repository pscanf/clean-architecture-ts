import React from "react";

import { ITodo } from "../../core/entities/Todo";

import TodoList from "./TodoList";
import NewTodoInput from "./NewTodoInput";

interface IProps {
    listTodos(): Promise<ITodo[]>;
    createTodo(title: string): Promise<ITodo>;
    doTodo(id: string): Promise<ITodo>;
}
interface IState {
    todos: ITodo[];
}
export default class App extends React.Component<IProps, IState> {
    state = { todos: [] };
    getTodosList = async () => {
        this.setState({ todos: await this.props.listTodos() });
    };
    handleDoTodo = async (id: string) => {
        await this.props.doTodo(id);
        await this.getTodosList();
    };
    handleCreateTodo = async (title: string) => {
        await this.props.createTodo(title);
        await this.getTodosList();
    };
    componentDidMount() {
        this.getTodosList();
    }
    render() {
        return (
            <main>
                <TodoList
                    todos={this.state.todos}
                    onDoTodo={this.handleDoTodo}
                />
                <NewTodoInput onCreateTodo={this.handleCreateTodo} />
            </main>
        );
    }
}
