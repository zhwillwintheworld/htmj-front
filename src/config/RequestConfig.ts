import {LoginRequest, QueryUserRoomStatusRequest, RegisterRequest} from "../domain/param/UserParam.ts";
import {message} from "antd";
import {UserLoginResponse} from "../domain/Response/UserResponse.ts";
import {ApiError, HttpError} from "../domain/Error.ts";
import {RoomInfoResponse} from "../domain/Response/RoomInfoResponse.ts";

export const WEB_URL = 'http://localhost:4751'
export const WS_URL = 'ws://localhost:8082'


export const WEB_CONFIG = {
    "login": "/user/login",
    "register": "/user/register",
    "upload": "/file/upload",
    "getRoomInfo": "/room/queryStatus",
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
    return customFetch<UserLoginResponse>(WEB_URL + WEB_CONFIG.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })
}

export const API_REGISTER = async (request: RegisterRequest): Promise<UserLoginResponse> => {
    return customFetch<UserLoginResponse>(WEB_URL + WEB_CONFIG.register, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })
}

export const API_ROOM_INFO = async (request: QueryUserRoomStatusRequest): Promise<RoomInfoResponse> => {
    return customFetch<RoomInfoResponse>(WEB_URL + WEB_CONFIG.getRoomInfo, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
    })
}


