import {LoginRequest} from "../domain/param/UserParam.ts";
import {message} from "antd";
import {UserLoginResponse} from "../domain/Response/UserResponse.ts";

export const WEB_URL = 'http://localhost:4751'
export const WS_URL = 'ws://localhost:8082'


const webConfig = {
    "login": "/user/login"
}


// 自定义Fetch函数，带有错误拦截器
const customFetch = async <T>(url: string, options: RequestInit = {}): Promise<T> => {
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        if (error instanceof Error) {
            // 使用Ant Design的message组件显示错误信息
            message.error(`Fetch error: ${error.message}`);
        }
        throw error; // 继续抛出错误以便调用者可以处理
    }
};

export const API_LOGIN = async (login: LoginRequest) : Promise<UserLoginResponse> => {
    return customFetch<UserLoginResponse>(WEB_URL + webConfig.login, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(login),
    })
}
