import React, {createContext} from 'react';

import {ISubscriber, Payload} from "rsocket-types";
import {Buffer} from "buffer";

export const MessageContext = createContext<ISubscriber<Payload<Buffer, Buffer>> | null>(null);

// 上下文提供者组件
// 定义 TasksProvider 组件
type Action = { type: 'SET'; payload: ISubscriber<Payload<Buffer, Buffer>> | null } | { type: 'CLEAR'; payload: null };

export const MessageChangeContext = createContext<React.Dispatch<Action> | null>(null);

export function messageReducer(message: ISubscriber<Payload<Buffer, Buffer>> | null, action: Action) {
    if (message == null && action.payload != null) {
        console.log("message is null but change not null")
    }
    switch (action.type) {
        // 重新初始化
        case 'SET':
            return action.payload;
        case 'CLEAR':
            return null;
        default:
            throw new Error(`Unhandled action type`);
    }
}





