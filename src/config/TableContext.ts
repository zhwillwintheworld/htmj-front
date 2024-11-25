import React, {createContext} from 'react';
import {TableProps} from "../domain/Table.ts";
import {
    MahjongChangeResponseMessage,
    MahjongEndResponseMessage,
    MahjongErrorResponseMessage,
    MahjongInitResponseMessage,
    MahjongLeaseResponseMessage,
    MahjongOutResponseMessage,
    MahjongSendLeaseResponseMessage
} from "../domain/Task.js";
import {
    changeTableProp,
    endTableProp,
    initTableProp,
    leaseTableProp,
    outTableProp,
    sendLeaseTableProp
} from "../util/TableUtil.ts";

export const TableContext = createContext<TableProps | null>(null);
export const TableChangeContext = createContext<React.Dispatch<Action> | null>(null);

// 上下文提供者组件
// 定义 TasksProvider 组件
type Action = { type: 'INIT'; payload: MahjongInitResponseMessage, userCode: string } |
    { type: 'CHANGE'; payload: MahjongChangeResponseMessage, userCode: string } |
    { type: 'END'; payload: MahjongEndResponseMessage, userCode: string } |
    { type: 'OUT'; payload: MahjongOutResponseMessage } |
    { type: 'LEASE'; payload: MahjongLeaseResponseMessage } |
    { type: 'SEND_LEASE'; payload: MahjongSendLeaseResponseMessage } |
    { type: 'ERROR'; payload: MahjongErrorResponseMessage, userCode: string } |
    { type: 'CLEAR'; payload: null }

export function tableReducer(tableProps: TableProps | null, action: Action): TableProps | null {
    switch (action.type) {
        // 重新初始化
        case 'INIT':
            return initTableProp(action.payload, action.userCode);
        case 'CHANGE':
            return changeTableProp(tableProps!, action.payload, action.userCode)
        case "OUT":
            return outTableProp(tableProps!, action.payload)
        case "LEASE":
            return leaseTableProp(tableProps!, action.payload)
        case 'SEND_LEASE':
            return sendLeaseTableProp(tableProps!, action.payload)
        case "END":
            return endTableProp(tableProps!, action.payload)
        case "CLEAR":
            return null
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}





