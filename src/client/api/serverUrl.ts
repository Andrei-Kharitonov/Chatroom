import { NODE_ENV, PORT } from "src/shared/env";

export const serverUrl = NODE_ENV !== 'production' ? `http://localhost:${PORT}` : 'https://chatroom-nest-next.herokuapp.com';