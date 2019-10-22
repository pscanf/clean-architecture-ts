import { ITodo } from "../entities/Todo";

export default interface ITodoRepository {
    findOneById(id: string): Promise<ITodo | null>;
    findMany(): Promise<ITodo[]>;
    createOne(todo: {
        id: string;
        title: string;
        isDone: boolean;
    }): Promise<ITodo>;
    updateOne(id: string, patch: { isDone: boolean }): Promise<ITodo>;
}
