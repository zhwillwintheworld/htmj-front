import {Mahjong, Position, UserDTO} from "./Task.ts";
import {LeaseStats} from "rsocket-core";

interface Seat {
    // 用户信息
    user: UserDTO,
    // 位置
    position: Position,
    // 剩余牌
    extraList: Array<Mahjong>,
    // 公开牌
    publicList: Array<Mahjong>,
    // 出牌
    outList: Array<Mahjong>,
    // 分数
    points: number,
    // 下了多少手
    step: number,
    // 是否报听
    isPublic: boolean,
    // 是否听牌
    isReady: boolean,
}

interface Table {
    roomId: string,
    // 桌号
    tableId: string,
    // 开局的人
    openUser: UserDTO,
    // 打牌的人
    east: Seat,
    south: Seat,
    west: Seat,
    north: Seat,
    currentSeat: Seat,
    // 能否能烧庄
    canFireWinner: boolean,
    // 大大胡配置
    bigBigWinConfig: boolean,
    // 完庄完杠
    completeWinnerConfig: boolean,
    // 烧庄配置
    fireWinnerConfig: number,
    // 是否能够报听
    canPublic: boolean,
    // 骰子点数
    randomNumber: number,
    // 创建时间
    createTime: number
    // 等待多家反应的租约 编号，例如一家胡 一家碰
    leaseNumber: number
    // 下了多少手
    step: number
    // 当前任务id
    taskId: string
    // 当前任务类型
    taskType: TaskType
}

enum TaskType {
    OUT = 'OUT',
    LEASE = 'LEASE',
}

enum SupplierType {
    CATCH = 'CATCH',
    OUT = 'OUT',
    GANG = 'GANG',
}

interface SeatProps {
    extraList: Array<Mahjong>,
    publicList: Array<Mahjong>,
    seat: 'top' | 'bottom' | 'left' | 'right';
    position: Position;
    leaseStatus: LeaseStats | null,
    points: number,
    isPublic: boolean,
    user: UserDTO,
    // 下了多少手
    step: number,
}

interface CenterProps {
    topList: Array<Mahjong>,
    bottomList: Array<Mahjong>,
    leftList: Array<Mahjong>,
    rightList: Array<Mahjong>,
    position: Position,
    mahjong: Mahjong | null,
}

export {

    TaskType, SupplierType
}

export type {
    Table, Seat, SeatProps,CenterProps
}