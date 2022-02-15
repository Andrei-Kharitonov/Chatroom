import { NODE_ENV } from "src/shared/env";

export const serverUrl = NODE_ENV !== 'production' ? 'http://localhost:3000' : 'https://chatroom-nest-next.herokuapp.com';