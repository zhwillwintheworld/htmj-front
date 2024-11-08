import React, {createContext} from 'react';
import {TableProps, TaskType} from "../domain/Table.ts";
import {
    Color,
    EndWay,
    MahjongChangeResponseMessage,
    MahjongEndResponseMessage,
    MahjongErrorResponseMessage,
    MahjongInitResponseMessage,
    MahjongLeaseResponseMessage,
    MahjongOutResponseMessage,
    MahjongSendLeaseResponseMessage,
    Position,
    UserType
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
    { type: 'ERROR'; payload: MahjongErrorResponseMessage, userCode: string };

export function tableReducer(tableProps: TableProps, action: Action) {
    switch (action.type) {
        // 重新初始化
        case 'INIT':
            return initTableProp(action.payload, action.userCode);
        case 'CHANGE':
            return changeTableProp(tableProps, action.payload, action.userCode)
        case "OUT":
            return outTableProp(tableProps, action.payload)
        case "LEASE":
            return leaseTableProp(tableProps, action.payload)
        case 'SEND_LEASE':
            return sendLeaseTableProp(tableProps, action.payload)
        case "END":
            return endTableProp(tableProps, action.payload)
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}

const mahjongList = [{
    number: 1, order: 1, color: Color.WAN
}, {
    number: 1, order: 2, color: Color.WAN
}, {
    number: 1, order: 3, color: Color.WAN
}, {
    number: 1, order: 4, color: Color.WAN
}, {
    number: 1, order: 5, color: Color.WAN
}, {
    number: 1, order: 6, color: Color.WAN
}, {
    number: 1, order: 7, color: Color.WAN
},
    {
        number: 1, order: 8, color: Color.WAN
    },
    {
        number: 1, order: 9, color: Color.WAN
    },
    {
        number: 1, order: 10, color: Color.WAN
    },
    {
        number: 1, order: 11, color: Color.WAN
    }]

const publicList = [{
    number: 1, order: 1, color: Color.WAN
}, {
    number: 1, order: 2, color: Color.WAN
}, {
    number: 1, order: 3, color: Color.WAN
}, {
    number: 1, order: 4, color: Color.WAN
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
            publicList: publicList,
            step: 0,
            user: {
                userCode: '1',
                userType: UserType.GENERAL,
                userName: '华少神临',
                avatar: '',
                nickName: '',
            },
            catch: null
        },
        east: {
            extraList: mahjongList,
            isPublic: false,
            isReady: false,
            outList: mahjongList,
            points: 0,
            position: Position.EAST,
            publicList: publicList,
            step: 0,
            user: {
                userCode: '1',
                userType: UserType.GENERAL,
                userName: '华少神临',
                avatar: '',
                nickName: '',
            },
            catch: null
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
            publicList: publicList,
            step: 0,
            user: {
                userCode: '2',
                userType: UserType.GENERAL,
                userName: '许馨元',
                avatar: '',
                nickName: '',
            },
            catch: null
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
            publicList: publicList,
            step: 0,
            user: {
                userCode: '4',
                userType: UserType.GENERAL,
                userName: '小胡',
                avatar: '',
                nickName: '',
            },
            catch: null
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
            publicList: publicList,
            step: 0,
            user: {
                userCode: '3',
                userType: UserType.GENERAL,
                userName: '张梓婷',
                avatar: '',
                nickName: '',
            },
            catch: null
        }
    },
    taskId: '',
    timeLimit: 0,
    leaseNumber: 0,
    leaseStatus: [],
    canOut: false,
    canLease: false,
    displayLeaseStatus: null,
    displayMahjong: null,
    endDetail: {
        endWay: EndWay.NO_MAHJONG,
        winner: null,
        loser: null,
        specificLoser: null,
        specificNumber:1
        // winner: [{
        //     position: Position.EAST,
        //     points: 20,
        //     operation: SupplierType.OUT,
        //     huType: [HuType.LOONG_SEVEN_PAIR]
        // },{
        //     position: Position.WEST,
        //     points: 10,
        //     operation: SupplierType.OUT,
        //     huType: [HuType.CLEAR]
        // }],
        // loser: [{
        //     position: Position.NORTH,
        //     points: 30,
        //     operation: SupplierType.OUT,
        // },]
    },
}



