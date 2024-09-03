import React, {createContext, useContext} from 'react';
import {Table, TaskType} from "../domain/Table.ts";
import {Position, UserType} from "../domain/Task.js";

export const TableContext= createContext<Table|null>(null);
export const TableChangeContext = createContext<React.Dispatch<Action>|null>(null);

// 上下文提供者组件
// 定义 TasksProvider 组件
export function useTasks() {
    return useContext(TableContext);
}

export function useTasksDispatch() {
    return useContext(TableChangeContext);
}

type Action = { type: 'SET_TABLE'; payload: Table }

export function tableReducer(table: Table,action: Action) {
    console.log(table.tableId + "牌局发生了修改")
    switch (action.type) {
        case 'SET_TABLE':
            return action.payload;
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

export const table: Table = {
    bigBigWinConfig: false,
    canFireWinner: false,
    canPublic: false,
    completeWinnerConfig: false,
    createTime: 0,
    currentSeat: {
        extraList: [],
        isPublic: false,
        isReady: false,
        outList: [],
        points: 0,
        position: Position.EAST,
        publicList: [],
        step: 0,
        user: {
            userCode: '',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    },
    east: {
        extraList: [],
        isPublic: false,
        isReady: false,
        outList: [],
        points: 0,
        position: Position.EAST,
        publicList: [],
        step: 0,
        user: {
            userCode: '',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    },
    fireWinnerConfig: 0,
    leaseNumber: 0,
    north: {
        extraList: [],
        isPublic: false,
        isReady: false,
        outList: [],
        points: 0,
        position: Position.NORTH,
        publicList: [],
        step: 0,
        user: {
            userCode: '',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    },
    openUser: {
        userCode: '',
        userType: UserType.GENERAL,
        userName: '',
        avatar: '',
        nickName: '',
    },
    randomNumber: 0,
    roomId: '',
    south: {
        extraList: [],
        isPublic: false,
        isReady: false,
        outList: [],
        points: 0,
        position: Position.SOUTH,
        publicList: [],
        step: 0,
        user: {
            userCode: '',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    },
    step: 0,
    tableId: '',
    taskId: '',
    taskType: TaskType.LEASE,
    west: {
        extraList: [],
        isPublic: false,
        isReady: false,
        outList: [],
        points: 0,
        position: Position.WEST,
        publicList: [],
        step: 0,
        user: {
            userCode: '',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    }
}

