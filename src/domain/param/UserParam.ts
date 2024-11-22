interface LoginRequest {
    username: string;
    password: string;
    platform: string;
    app: string;
}

interface RegisterRequest {
    username: string,
    platform: string,
    app: string,
    password: string,
    avatar: string | null,
    nickname: string | null,
    birthday: string | null,
}

interface QueryUserRoomStatusRequest {
    userCode: string,
    platform: string,
    app: string,
}

export type {
    LoginRequest, RegisterRequest, QueryUserRoomStatusRequest
}
