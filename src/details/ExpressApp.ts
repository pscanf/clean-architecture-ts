import { json } from "body-parser";
import express from "express";

import ITodoRepository from "../core/gateways/ITodoRepository";
import IUniqueIdGenerator from "../core/gateways/IUniqueIdGenerator";
import CreateTodo from "../core/usecases/CreateTodo";
import DoTodo from "../core/usecases/DoTodo";
import ListTodos from "../core/usecases/ListTodos";

export default class ExpressApp {
    private app: express.Application;
    constructor(
        private todoRepository: ITodoRepository,
        private uniqueIdGenerator: IUniqueIdGenerator
    ) {
        this.app = express()
            .use(json())
            .get("/todos", async (_req, res) => {
                const listTodos = new ListTodos(this.todoRepository);
                const todos = await listTodos.exec();
                res.status(200).send(todos);
            })
            .post("/todos", async (req, res) => {
                const createTodo = new CreateTodo(
                    this.todoRepository,
                    this.uniqueIdGenerator
                );
                const todo = await createTodo.exec(req.body.title);
                res.status(201).send(todo);
            })
            .post("/todos/:todoId/do", async (req, res) => {
                const doTodo = new DoTodo(this.todoRepository);
                await doTodo.exec(req.params.todoId);
                res.status(204).send();
            });
    }

    start() {
        this.app.listen(8080, () => {
            console.log("Server listening on port 8080");
        });
    }
}
