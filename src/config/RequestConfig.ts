import {LoginRequest, RegisterRequest} from "../domain/param/UserParam.ts";
import {message} from "antd";
import {UserLoginResponse} from "../domain/Response/UserResponse.ts";
import {ApiError, HttpError} from "../domain/Error.ts";
import {RoomInfoResponse} from "../domain/Response/RoomInfoResponse.ts";
import {
    ChangePositionRequest,
    CreateRoomRequest,
    EnterRoomRequest,
    ExitRoomRequest,
    StartMahjongRequest
} from "../domain/param/RoomParam.ts";


export const WEB_URL = 'http://localhost:4751'
export const WS_URL = 'ws://localhost:8082'


export const WEB_CONFIG = {
    "login": "/user/login",
    "register": "/user/register",
    "upload": "/file/upload",
    "getRoomInfo": "/room/queryStatus",
    "createRoom": "/room/create",
    "enterRoom": "/room/enter",
    "exitRoom": "/room/exit",
    "changePosition": "/room/changePosition",
    "startGame": "/room/start",
    "getTableInfo": "/table/queryStatus",
}


// 自定义Fetch函数，带有错误拦截器
const customFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new HttpError(`HTTP error! status: ${response.status}`);
        }
        const res = await response.json();
        if (res.code != 200) {
            throw new ApiError(res.code, `HTTP error! status: ${res.msg}`);
        }
        return res.data
    } catch (error) {
        if (error instanceof Error) {
            // 使用Ant Design的message组件显示错误信息
            message.error(`Fetch error: ${error.message}`);
        }
        throw error; // 继续抛出错误以便调用者可以处理
    }
};

export const API_LOGIN = async (request: LoginRequest): Promise<UserLoginResponse> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<UserLoginResponse>(WEB_URL + WEB_CONFIG.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_REGISTER = async (request: RegisterRequest): Promise<UserLoginResponse> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<UserLoginResponse>(WEB_URL + WEB_CONFIG.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_ROOM_INFO = async (): Promise<RoomInfoResponse> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<RoomInfoResponse>(WEB_URL + WEB_CONFIG.getRoomInfo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
    })
}

export const API_CREATE_ROOM = async (request: CreateRoomRequest): Promise<void> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<void>(WEB_URL + WEB_CONFIG.createRoom, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_ENTER_ROOM = async (request: EnterRoomRequest): Promise<void> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<void>(WEB_URL + WEB_CONFIG.enterRoom, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_EXIT_ROOM = async (request: ExitRoomRequest): Promise<void> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<void>(WEB_URL + WEB_CONFIG.exitRoom, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_CHANGE_POSITION = async (request: ChangePositionRequest): Promise<void> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<void>(WEB_URL + WEB_CONFIG.changePosition, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_START_GAME = async (request: StartMahjongRequest): Promise<void> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<void>(WEB_URL + WEB_CONFIG.startGame, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        },
        body: JSON.stringify(request),
    })
}

export const API_TABLE_INFO = async (): Promise<void> => {
    const token = localStorage.getItem('token')
    const auth = token == null ? "" : token
    return customFetch<void>(WEB_URL + WEB_CONFIG.getTableInfo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': auth,
        }
    })
}


