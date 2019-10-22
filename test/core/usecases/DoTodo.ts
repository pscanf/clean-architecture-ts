import { expect } from "chai";

import DoTodo from "../../../src/core/usecases/DoTodo";
import { getMockTodoRepository } from "../testUtils";
import {
    TodoAlreadyDoneError,
    TodoNotFoundError
} from "../../../src/core/common/errors";

describe("usecase DoTodo", () => {
    it("throws TodoNotFoundError if no todo exists with the provided id", async () => {
        const todoRepository = getMockTodoRepository();
        todoRepository.findOneById.resolves(null);
        const doTodo = new DoTodo(todoRepository);
        const doTodoPromise = doTodo.exec("id");
        await expect(doTodoPromise).to.be.rejectedWith(TodoNotFoundError);
    });

    it("throws TodoAlreadyDoneError if the todo with the provided id is already done", async () => {
        const todoRepository = getMockTodoRepository();
        todoRepository.findOneById.resolves({
            id: "id",
            title: "title",
            isDone: true
        });
        const doTodo = new DoTodo(todoRepository);
        const doTodoPromise = doTodo.exec("id");
        await expect(doTodoPromise).to.be.rejectedWith(TodoAlreadyDoneError);
    });

    it("updates as done the todo with the provided id", async () => {
        const todoRepository = getMockTodoRepository();
        todoRepository.findOneById.resolves({
            id: "id",
            title: "title",
            isDone: false
        });
        const doTodo = new DoTodo(todoRepository);
        await doTodo.exec("id");
        expect(todoRepository.updateOne).to.have.been.calledOnceWith("id", {
            isDone: true
        });
    });

    it("returns the updated todo", async () => {
        const todoRepository = getMockTodoRepository();
        todoRepository.findOneById.resolves({
            id: "id",
            title: "title",
            isDone: false
        });
        todoRepository.updateOne.resolves({
            id: "id",
            title: "title",
            isDone: true
        });
        const doTodo = new DoTodo(todoRepository);
        const updatedTodo = await doTodo.exec("id");
        expect(updatedTodo).to.deep.equal({
            id: "id",
            title: "title",
            isDone: true
        });
    });
});
