import { expect } from "chai";

import ListTodos from "../../../src/core/usecases/ListTodos";
import { getMockTodoRepository } from "../testUtils";

describe("usecase ListTodos", () => {
    it("returns a list of all todos", async () => {
        const todoRepository = getMockTodoRepository();
        todoRepository.findMany.resolves([
            {
                id: "id",
                title: "title",
                isDone: false
            }
        ]);
        const listTodos = new ListTodos(todoRepository);
        const todos = await listTodos.exec();
        expect(todos).to.deep.equal([
            {
                id: "id",
                title: "title",
                isDone: false
            }
        ]);
    });
});
