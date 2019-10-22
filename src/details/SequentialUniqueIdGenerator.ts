import IUniqueIdGenerator from "../core/gateways/IUniqueIdGenerator";

export default class SequentialUniqueIdGenerator implements IUniqueIdGenerator {
    private previousId = 0;
    async generateId(): Promise<string> {
        this.previousId += 1;
        return this.previousId.toString();
    }
}
