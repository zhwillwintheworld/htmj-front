import React, {createContext} from 'react';
import {UserLoginResponse} from "../domain/Response/UserResponse.ts";


export const UserContext = createContext<UserLoginResponse | null>(null);

// 上下文提供者组件
// 定义 TasksProvider 组件
type Action = { type: 'SET'; payload: UserLoginResponse | null }

export const UserChangeContext = createContext<React.Dispatch<Action> | null>(null);

export function userReducer(message: UserLoginResponse | null, action: Action) {
    if (message == null && action.payload != null) {
        console.log("message is null but change not null")
    }
    switch (action.type) {
        // 重新初始化
        case 'SET':
            return action.payload;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}





