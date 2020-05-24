import { json } from "body-parser";
import express from "express";
import {
    TodoAlreadyDoneError,
    TodoNotFoundError,
    TodoTitleNotValidError,
} from "../core/common/errors";
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
            .use(((error, _req, res, _next) => {
                console.log(error);
                res.status(500).send({ message: "Internal server error" });
            }) as express.ErrorRequestHandler)
            .use(json())
            .get("/todos", async (_req, res) => {
                const listTodos = new ListTodos(this.todoRepository);
                const todos = await listTodos.exec();
                res.status(200).send(todos);
            })
            .post("/todos", async (req, res) => {
                try {
                    const createTodo = new CreateTodo(
                        this.todoRepository,
                        this.uniqueIdGenerator
                    );
                    const todo = await createTodo.exec(req.body.title);
                    res.status(201).send(todo);
                } catch (error) {
                    if (error instanceof TodoTitleNotValidError) {
                        res.status(400).send({
                            message: error.message,
                        });
                    } else {
                        throw error;
                    }
                }
            })
            .post("/todos/:todoId/do", async (req, res) => {
                try {
                    const doTodo = new DoTodo(this.todoRepository);
                    await doTodo.exec(req.params.todoId);
                    res.status(204).send();
                } catch (error) {
                    if (
                        error instanceof TodoAlreadyDoneError ||
                        error instanceof TodoNotFoundError
                    ) {
                        res.status(400).send({
                            message: error.message,
                        });
                    } else {
                        throw error;
                    }
                }
            });
    }

    start() {
        this.app.listen(8080, () => {
            console.log("Server listening on port 8080");
        });
    }
}
