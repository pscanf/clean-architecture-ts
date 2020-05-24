import sinon, { SinonStub } from "sinon";
import ITodoRepository from "../../src/core/gateways/ITodoRepository";
import IUniqueIdGenerator from "../../src/core/gateways/IUniqueIdGenerator";

type MockTodoRepository = {
    [method in keyof ITodoRepository]: SinonStub<
        Parameters<ITodoRepository[method]>,
        ReturnType<ITodoRepository[method]>
    >;
};
export function getMockTodoRepository(): MockTodoRepository {
    return {
        findOneById: sinon.stub(),
        findMany: sinon.stub(),
        createOne: sinon.stub(),
        updateOne: sinon.stub(),
    };
}

type MockUniqueIdGenerator = {
    [method in keyof IUniqueIdGenerator]: SinonStub<
        Parameters<IUniqueIdGenerator[method]>,
        ReturnType<IUniqueIdGenerator[method]>
    >;
};
export function getMockUniqueIdGenerator(): MockUniqueIdGenerator {
    return {
        generateId: sinon.stub(),
    };
}
