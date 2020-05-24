import { randomBytes } from "crypto";
import IUniqueIdGenerator from "../core/gateways/IUniqueIdGenerator";

export default class RandomUniqueIdGenerator implements IUniqueIdGenerator {
    async generateId(): Promise<string> {
        return randomBytes(4).toString("hex");
    }
}
