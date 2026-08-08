import { environment } from "./environment";

export const credentials = {
    validUser: {
        username: environment.username,
        password: environment.password
    },

    invalidUser: {
        username: environment.username,
        password: 'wrongPassword'
    }
};