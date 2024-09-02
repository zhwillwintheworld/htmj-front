import {Position, UserDTO} from "./Task.ts";

interface Seat {
    // 用户信息
    user: UserDTO,
    // 位置
    position: Position,
    // 剩余牌
    extraList: Array<number>,
    // 公开牌
    publicList: Array<number>,
    // 出牌
    outList: Array<number>,
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
    OUT,
    LEASE
}

export {
    TaskType
}

export type {
    Table, Seat
}