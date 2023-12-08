import { authHandlers } from "./endpoints/auth.endpoint";
import { todoHandlers } from "./endpoints/todo.endpoint";

export const handlers = [...authHandlers, ...todoHandlers];
