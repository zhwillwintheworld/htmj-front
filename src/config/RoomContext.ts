import React, {createContext} from 'react';
import {RoomInfoResponse} from "../domain/Response/RoomInfoResponse.ts";


export const RoomContext = createContext<RoomInfoResponse | null>(null);

// 上下文提供者组件
// 定义 TasksProvider 组件
type Action = { type: 'SET'; payload: RoomInfoResponse | null } | { type: 'RESET',payload: null };

export const RoomChangeContext = createContext<React.Dispatch<Action> | null>(null);

export function roomReducer(message: RoomInfoResponse | null, action: Action) {
    if (message == null && action.payload != null) {
        console.log("message is null but change not null")
    }
    switch (action.type) {
        // 重新初始化
        case 'SET':
            return action.payload;
        case "RESET":
            return null;
        default:
            throw new Error(`Unhandled action type:`);
    }
}





