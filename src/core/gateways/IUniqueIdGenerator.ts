export default interface IUniqueIdGenerator {
    generateId(): Promise<string>;
}
