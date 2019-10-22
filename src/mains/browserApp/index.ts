import ReactApp from "../../details/ReactApp";
import InMemoryTodoRepository from "../../details/InMemoryTodoRepository";
import SequentialUniqueIdGenerator from "../../details/SequentialUniqueIdGenerator";

const reactApp = new ReactApp(
    new InMemoryTodoRepository(),
    new SequentialUniqueIdGenerator()
);
reactApp.start();
