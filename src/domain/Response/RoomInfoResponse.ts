import {UserDTO} from "../Task.ts";

interface RoomInfoResponse {
    onRoom: boolean,
    roomBasic: RoomBasicDTO | null,
    roomConfig: RoomConfigDTO | null,
    roomTable: RoomTableDTO | null,
    roomMember: UserDTO[] | null
}

interface RoomConfigDTO {
    // 是否公开
    isPublic: RoomPublic,
    // 进房间的密码
    password: string | null,
    // 限制进入的人数
    limit: number,
    // 能否能烧庄
    canFireWinner: boolean,
    // boolean
    bigBigWinConfig: boolean,
    // 完庄完杠
    completeWinnerConfig: boolean,
    // 烧庄配置
    fireWinnerConfig: number,
    // 是否可以报听
    canPublic: boolean,
}

interface RoomTableDTO {
    east: PlayerDTO | null,
    south: PlayerDTO | null,
    west: PlayerDTO | null,
    north: PlayerDTO | null,
}

interface PlayerDTO {
    user: UserDTO,
    points: number,
}

interface RoomBasicDTO {
    roomId: string,
    roomName: string,
    master: UserDTO,
    createTime: number,
    roomMode: RoomMode,
}

enum RoomMode {
    GAME = 'GAME',
    CHAT = 'CHAT',
}

enum RoomPublic {
    PRIVATE = 'PRIVATE',
    PUBLIC = 'PUBLIC',
}

export type {
    RoomInfoResponse, RoomConfigDTO, RoomTableDTO, PlayerDTO, RoomBasicDTO
}

export {
    RoomMode, RoomPublic,
}
