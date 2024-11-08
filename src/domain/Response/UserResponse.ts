import {UserType} from "../Task.ts";

interface UserLoginResponse {
    userCode: string,
    userType: UserType,
    token: string
}

export type {
    UserLoginResponse
}
