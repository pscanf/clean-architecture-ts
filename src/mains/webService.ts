import { tmpdir } from "os";
import { join } from "path";

import ExpressApp from "../details/ExpressApp";
import FsTodoRepository from "../details/FsTodoRepository";
import RandomUniqueIdGenerator from "../details/RandomUniqueIdGenerator";

const expressApp = new ExpressApp(
    new FsTodoRepository(join(tmpdir(), "todos-db.json")),
    new RandomUniqueIdGenerator()
);
expressApp.start();
