import { readJSON, writeJSON } from "fs-extra";
import { ITodo } from "../core/entities/Todo";
import ITodoRepository from "../core/gateways/ITodoRepository";

interface IDb {
    [id: string]: ITodo;
}

export default class FsTodoRepository implements ITodoRepository {
    constructor(private databasePath: string) {}

    async findOneById(id: string): Promise<ITodo | null> {
        const db = await this.readDb();
        return db[id] || null;
    }

    async findMany(): Promise<ITodo[]> {
        const db = await this.readDb();
        return Object.values(db);
    }

    async createOne(todo: {
        id: string;
        title: string;
        isDone: boolean;
        createdAt: Date;
        doneAt: Date | null;
    }): Promise<ITodo> {
        const db = await this.readDb();
        db[todo.id] = todo;
        await this.writeDb(db);
        return db[todo.id];
    }

    async updateOne(
        id: string,
        patch: {
            isDone: boolean;
            doneAt: Date;
        }
    ): Promise<ITodo> {
        const db = await this.readDb();
        db[id] = {
            ...db[id],
            ...patch,
        };
        await this.writeDb(db);
        return db[id];
    }

    private async readDb(): Promise<IDb> {
        try {
            return await readJSON(this.databasePath);
        } catch (ignore) {
            return {};
        }
    }

    private async writeDb(db: IDb): Promise<void> {
        await writeJSON(this.databasePath, db);
    }
}
