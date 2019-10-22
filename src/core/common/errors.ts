export class TodoAlreadyDoneError extends Error {
    constructor(id: string) {
        super(`todo with id = ${id} is already done`);
    }
}

export class TodoNotFoundError extends Error {
    constructor(id: string) {
        super(`No todo found with id = ${id}`);
    }
}

export class TodoTitleNotValidError extends Error {
    constructor(title: string) {
        super(`${JSON.stringify(title)} is not a valid title for a todo`);
    }
}
