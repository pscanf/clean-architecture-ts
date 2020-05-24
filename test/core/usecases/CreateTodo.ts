import { expect } from "chai";
import CreateTodo from "../../../src/core/usecases/CreateTodo";
import { getMockTodoRepository, getMockUniqueIdGenerator } from "../testUtils";

describe("usecase CreateTodo", () => {
    it("creates an un-done todo", async () => {
        const todoRepository = getMockTodoRepository();
        const uniqueIdGenerator = getMockUniqueIdGenerator();
        uniqueIdGenerator.generateId.resolves("id");
        const createTodo = new CreateTodo(todoRepository, uniqueIdGenerator);
        await createTodo.exec("title");
        expect(todoRepository.createOne).to.have.been.calledOnceWith({
            id: "id",
            title: "title",
            isDone: false,
        });
    });

    it("returns the created todo", async () => {
        const todoRepository = getMockTodoRepository();
        todoRepository.createOne.resolves({
            id: "id",
            title: "title",
            isDone: false,
        });
        const uniqueIdGenerator = getMockUniqueIdGenerator();
        uniqueIdGenerator.generateId.resolves("id");
        const createTodo = new CreateTodo(todoRepository, uniqueIdGenerator);
        const createdTodo = await createTodo.exec("title");
        expect(createdTodo).to.deep.equal({
            id: "id",
            title: "title",
            isDone: false,
        });
    });
});
