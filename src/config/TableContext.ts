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

const mahjongList = [{
    number:1,order:1
},{
    number:1,order:2
},{
    number:1,order:3
},{
    number:1,order:4
},{
    number:1,order:5
},{
    number:1,order:6
},{
    number:1,order:7
},
{
    number:1,order:8
},
{
    number:1,order:9
},
{
    number:1,order:10
},
{
    number:1,order:11
},
{
    number:1,order:12
},
{
    number:1,order:13
},
{
    number:1,order:14
},]
export const table: Table = {
    bigBigWinConfig: false,
    canFireWinner: false,
    canPublic: false,
    completeWinnerConfig: false,
    createTime: 0,
    currentSeat: {
        extraList: mahjongList,
        isPublic: false,
        isReady: false,
        outList: mahjongList,
        points: 0,
        position: Position.EAST,
        publicList: mahjongList,
        step: 0,
        user: {
            userCode: '1',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    },
    east: {
        extraList: mahjongList,
        isPublic: false,
        isReady: false,
        outList: mahjongList,
        points: 0,
        position: Position.EAST,
        publicList: mahjongList,
        step: 0,
        user: {
            userCode: '1',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    },
    fireWinnerConfig: 0,
    leaseNumber: 0,
    north: {
        extraList: mahjongList,
        isPublic: false,
        isReady: false,
        outList: mahjongList,
        points: 0,
        position: Position.NORTH,
        publicList: mahjongList,
        step: 0,
        user: {
            userCode: '2',
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
        extraList: mahjongList,
        isPublic: false,
        isReady: false,
        outList: mahjongList,
        points: 0,
        position: Position.SOUTH,
        publicList: mahjongList,
        step: 0,
        user: {
            userCode: '4',
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
        extraList: mahjongList,
        isPublic: false,
        isReady: false,
        outList: mahjongList,
        points: 0,
        position: Position.WEST,
        publicList: mahjongList,
        step: 0,
        user: {
            userCode: '3',
            userType: UserType.GENERAL,
            userName: '',
            avatar: '',
            nickName: '',
        }
    }
}

