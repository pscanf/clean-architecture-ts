import { TodoTitleNotValidError } from "../common/errors";

export interface ITodo {
    id: string;
    title: string;
    isDone: boolean;
}

// Enterprise-wide business rule:
// the title of a todo is valid when it has 0 < length < 256
function isTitleValid(title: string): boolean {
    return title.length > 0 && title.length < 256;
}
function validateTodoTitle(title: string): void {
    if (!isTitleValid(title)) {
        throw new TodoTitleNotValidError(title);
    }
}

export function makeTodo(todo: ITodo): ITodo {
    validateTodoTitle(todo.title);
    return todo;
}
