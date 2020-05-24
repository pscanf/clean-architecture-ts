import { ITodo, makeTodo } from "../entities/Todo";
import ITodoRepository from "../gateways/ITodoRepository";
import IUniqueIdGenerator from "../gateways/IUniqueIdGenerator";

export default class CreateTodo {
    constructor(
        private todoRepository: ITodoRepository,
        private uniqueIdGenerator: IUniqueIdGenerator
    ) {}

    async exec(title: string): Promise<ITodo> {
        const id = await this.uniqueIdGenerator.generateId();
        const todo = makeTodo({
            id: id,
            title: title,
            // Application-specific business rule:
            // todos are created as not-done
            isDone: false,
        });
        return this.todoRepository.createOne(todo);
    }
}
