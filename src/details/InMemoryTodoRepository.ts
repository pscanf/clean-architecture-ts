import { cloneDeep } from "lodash";

import { ITodo } from "../core/entities/Todo";
import ITodoRepository from "../core/gateways/ITodoRepository";

interface IDb {
    [id: string]: ITodo;
}

export default class InMemoryTodoRepository implements ITodoRepository {
    private db: IDb = {};

    async findOneById(id: string): Promise<ITodo | null> {
        const db = this.readDb();
        return db[id] || null;
    }

    async findMany(): Promise<ITodo[]> {
        const db = this.readDb();
        return Object.values(db);
    }

    async createOne(todo: {
        id: string;
        title: string;
        isDone: boolean;
        createdAt: Date;
        doneAt: Date | null;
    }): Promise<ITodo> {
        const db = this.readDb();
        db[todo.id] = todo;
        this.writeDb(db);
        return db[todo.id];
    }

    async updateOne(
        id: string,
        patch: {
            isDone: boolean;
            doneAt: Date;
        }
    ): Promise<ITodo> {
        const db = this.readDb();
        db[id] = {
            ...db[id],
            ...patch
        };
        this.writeDb(db);
        return db[id];
    }

    private readDb(): IDb {
        return cloneDeep(this.db);
    }

    private writeDb(db: IDb): void {
        this.db = cloneDeep(db);
    }
}
