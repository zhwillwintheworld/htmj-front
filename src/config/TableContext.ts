import React, {createContext, useContext} from 'react';
import {Table, TableProps, TaskType} from "../domain/Table.ts";
import {
    LeaseStatus,
    MahjongChangeResponseMessage,
    MahjongEndResponseMessage,
    MahjongErrorResponseMessage,
    MahjongLeaseResponseMessage,
    MahjongOutResponseMessage,
    MahjongSendLeaseResponseMessage,
    Position,
    UserType
} from "../domain/Task.js";
import {
    changeTableProp,
    initTableProp,
    leaseTableProp,
    outTableProp,
    sendLeaseTableProp
} from "../component/util/TableUtil.ts";

export const TableContext = createContext<TableProps | null>(null);
export const TableChangeContext = createContext<React.Dispatch<Action> | null>(null);

// 上下文提供者组件
// 定义 TasksProvider 组件
export function useTasks() {
    return useContext(TableContext);
}

export function useTasksDispatch() {
    return useContext(TableChangeContext);
}

type Action = { type: 'INIT'; payload: Table} |
    { type: 'CHANGE'; payload: MahjongChangeResponseMessage, userCode: string } |
    { type: 'END'; payload: MahjongEndResponseMessage, userCode: string } |
    { type: 'OUT'; payload: MahjongOutResponseMessage } |
    { type: 'LEASE'; payload: MahjongLeaseResponseMessage } |
    { type: 'SEND_LEASE'; payload: MahjongSendLeaseResponseMessage } |
    { type: 'ERROR'; payload: MahjongErrorResponseMessage, userCode: string };

export function tableReducer(tableProps: TableProps, action: Action) {
    console.log(tableProps.table.tableId + "牌局发生了修改")
    switch (action.type) {
        // 重新初始化
        case 'INIT':
            return initTableProp(action.payload);
        case 'CHANGE':
            return changeTableProp(tableProps, action.payload,action.userCode)
        case "OUT":
            return outTableProp(tableProps, action.payload)
        case "LEASE":
            return leaseTableProp(tableProps, action.payload)
        case 'SEND_LEASE':
            return sendLeaseTableProp(tableProps, action.payload)
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const mahjongList = [{
    number: 1, order: 1
}, {
    number: 1, order: 2
}, {
    number: 1, order: 3
}, {
    number: 1, order: 4
}, {
    number: 1, order: 5
}, {
    number: 1, order: 6
}, {
    number: 1, order: 7
},
    {
        number: 1, order: 8
    },
    {
        number: 1, order: 9
    },
    {
        number: 1, order: 10
    },
    {
        number: 1, order: 11
    },
    {
        number: 1, order: 12
    },
    {
        number: 1, order: 13
    },
    {
        number: 1, order: 14
    },]
export const table: TableProps = {
    table: {
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
            },
            catch:null
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
            },
            catch:null
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
            },
            catch:null
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
            },
            catch:null
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
            },
            catch:null
        }
    },
    taskId: '',
    timeLimit: 0,
    leaseNumber: 0,
    leaseStatus: [LeaseStatus.HU, LeaseStatus.NONE,LeaseStatus.GANG, LeaseStatus.PENG],
    canOut: false,
    canLease: false,
    displayLeaseStatus: null,
    displayMahjong: null
}



