import { ITodo } from "../entities/Todo";
import ITodoRepository from "../gateways/ITodoRepository";

export default class ListTodos {
    constructor(private todoRepository: ITodoRepository) {}

    exec(): Promise<ITodo[]> {
        return this.todoRepository.findMany();
    }
}
