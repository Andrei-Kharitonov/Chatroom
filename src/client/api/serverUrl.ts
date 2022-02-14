import { NODE_ENV } from "src/shared/env";

let domain = typeof window === 'undefined' ? 'https://chatroom-nest-next.herokuapp.com' : window.location.origin;

export const serverUrl = NODE_ENV !== 'production' ? 'http://localhost:3000' : domain;