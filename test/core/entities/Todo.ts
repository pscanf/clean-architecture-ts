import { expect } from "chai";

import { TodoTitleNotValidError } from "../../../src/core/common/errors";
import { makeTodo } from "../../../src/core/entities/Todo";

describe("entity Todo", () => {
    describe("makeTodo", () => {
        it("throws TodoTitleNotValidError if the provided title is not valid", () => {
            const troublemaker = () =>
                makeTodo({
                    id: "id",
                    title: "",
                    isDone: false
                });
            expect(troublemaker).to.throw(TodoTitleNotValidError);
        });
    });
});
