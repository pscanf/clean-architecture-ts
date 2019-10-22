import React from "react";
import ReactDOM from "react-dom";

import ITodoRepository from "../../core/gateways/ITodoRepository";
import IUniqueIdGenerator from "../../core/gateways/IUniqueIdGenerator";
import CreateTodo from "../../core/usecases/CreateTodo";
import DoTodo from "../../core/usecases/DoTodo";
import ListTodos from "../../core/usecases/ListTodos";

import App from "./App";

export default class ReactApp {
    constructor(
        private todoRepository: ITodoRepository,
        private uniqueIdGenerator: IUniqueIdGenerator
    ) {}

    start() {
        const root = document.createElement("div");
        document.body.appendChild(root);
        ReactDOM.render(
            <App
                createTodo={title => {
                    const createTodo = new CreateTodo(
                        this.todoRepository,
                        this.uniqueIdGenerator
                    );
                    return createTodo.exec(title);
                }}
                listTodos={() => {
                    const listTodos = new ListTodos(this.todoRepository);
                    return listTodos.exec();
                }}
                doTodo={id => {
                    const doTodo = new DoTodo(this.todoRepository);
                    return doTodo.exec(id);
                }}
            />,
            root
        );
    }
}
