import { TodoAlreadyDoneError, TodoNotFoundError } from "../common/errors";
import { ITodo } from "../entities/Todo";
import ITodoRepository from "../gateways/ITodoRepository";

export default class DoTodo {
    constructor(private todoRepository: ITodoRepository) {}

    async exec(id: string): Promise<ITodo> {
        const existingTodo = await this.todoRepository.findOneById(id);
        // Application-specific business rule: to do a todo, the todo must exist
        if (!existingTodo) {
            throw new TodoNotFoundError(id);
        }
        // Application-specific business rule: a done todo cannot be done if
        // it's already done
        if (existingTodo.isDone) {
            throw new TodoAlreadyDoneError(id);
        }
        return this.todoRepository.updateOne(id, { isDone: true });
    }
}
