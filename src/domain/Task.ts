import {SupplierType, Table} from "./Table.ts";
import {RoomBasicDTO, RoomConfigDTO, RoomTableDTO} from "./Response/RoomInfoResponse.ts";

interface ClientRequest {
    traceId: string;
    createTime: number;
    userCode: string;
    token: string;
    platform: PLATFORM;
    communicateType: CommunicateType;
    communicateUserCode: string;
    communicateRoomCode: string;
    communicateGroupCode: string;
    message: ClientMessage
}

enum PLATFORM {
    WEB = 'WEB',
    APP = 'APP',
    MINI_PROGRAM = 'MINI_PROGRAM',
    SERVER = 'SERVER',
}

enum CommunicateType {
    P2P = 'P2P',
    P2G = 'P2G',
    ROOM = 'ROOM',
}

interface ClientMessage {
    messageType: ServerMessageType;
    messageContent: TextMessage | MahjongMessage;
}

enum ServerMessageType {
    TEXT = 'TEXT',
    MAHJONG = 'MAHJONG',
    EVENT = 'EVENT'
}

interface MahjongMessage {
    type: MahjongMessageType;
    event: MahjongMessageEvent;
    content: MahjongInitRequestMessage | MahjongOutResponseMessage | MahjongInitResponseMessage |
        MahjongChangeResponseMessage | MahjongSendLeaseResponseMessage | MahjongLeaseResponseMessage
        | MahjongEndResponseMessage | MahjongErrorResponseMessage | MahjongOutRequestMessage | MahjongLeaseRequestMessage
}

interface TextMessage {
    text: string
}

interface EventMessage {
    event: EventType,
    content: RoomUserMessage | RoomChangePositionMessage | RoomInitMessage
}

enum EventType {
    SELF_JOIN_ROOM = 'SELF_JOIN_ROOM',
    OTHER_JOIN_ROOM = 'OTHER_JOIN_ROOM',
    LEAVE_ROOM = 'LEAVE_ROOM',
    CHANGE_POSITION = 'CHANGE_POSITION',
}

interface RoomInitMessage {
    onRoom: boolean,
    roomBasic: RoomBasicDTO | null,
    roomConfig: RoomConfigDTO | null,
    roomTable: RoomTableDTO | null,
    roomMember: Array<UserDTO>|null
}

interface RoomUserMessage {
    user: UserDTO,
    time: number,
    position: Position | null,
}

interface RoomChangePositionMessage {
    user: UserDTO,
    time: number,
    position: Position,
    targetPosition: Position,
}

enum MahjongMessageType {
    REQUEST = 'REQUEST',
    RESPONSE = 'RESPONSE',
}

enum MahjongMessageEvent {
    INIT_REQUEST = 'INIT_REQUEST',
    OUT_REQUEST = 'OUT_REQUEST',
    LEASE_REQUEST = 'LEASE_REQUEST',
    INIT_RESPONSE = 'INIT_RESPONSE',
    CHANGE_RESPONSE = 'CHANGE_RESPONSE',
    OUT_RESPONSE = 'OUT_RESPONSE',
    LEASE_RESPONSE = 'LEASE_RESPONSE',
    SEND_LEASE_RESPONSE = 'SEND_LEASE_RESPONSE',
    ERROR_RESPONSE = 'ERROR_RESPONSE',
    END_RESPONSE = 'END_RESPONSE',
}

interface MahjongInitRequestMessage {
    roomId: string;
    seatInfo: InitSeatDTO,
    tableId: string;
}

interface MahjongOutRequestMessage {
    tableId: string,
    position: Position,
    mahjong: Mahjong,
    tableStep: number,
    seatStep: number,
    taskId: string,
}

// 反应请求
interface MahjongLeaseRequestMessage {
    tableId: string,
    status: LeaseStatus,
    leaseNumber: number,
    position: Position,
    taskId: string,
}

interface MahjongInitResponseMessage {
    timeLimit: number,
    table: Table,
    taskId: string
}

interface MahjongOutResponseMessage {
    position: Position,
    mahjong: Mahjong,
}

interface MahjongChangeResponseMessage {
    timeLimit: number,
    position: Position,
    mahjong: Mahjong | null,
    taskId: string | null,
    step: number
}

// 发送租约 响应
interface MahjongSendLeaseResponseMessage {
    timeLimit: number,
    statusList: Array<LeaseStatus>,
    happenedPosition: Position,
    mahjong: Mahjong,
    leaseNumber: number,
    taskId: string
}

// 租约响应
interface MahjongLeaseResponseMessage {
    status: LeaseStatus,
    leaseNumber: number,
    happenedUser: Position,
    receiveUser: Array<Position>,
    mahjong: Mahjong,
}

// 结束响应
interface MahjongEndResponseMessage {
    winner: Array<HuDetail> | null,
    loser: Array<LoseDetail> | null,
    table: Table,
    specificNumber: number | null,
    specificLoser: Position | null,
    endWay: EndWay,
}

interface EndDetail {
    winner: Array<HuDetail> | null,
    loser: Array<LoseDetail> | null,
    specificNumber: number | null,
    specificLoser: Position | null,
    endWay: EndWay,
}

interface MahjongErrorResponseMessage {
    code: number,
    message: string
}


interface HuDetail {
    position: Position,
    huType: Array<HuType>,
    operation: SupplierType,
    points: number
}

enum LeaseStatus {
    // 碰
    PENG = 'PENG',
    // 胡
    HU = 'HU',
    // 杠
    GANG = 'GANG',
    PRIVATE_GANG = 'PRIVATE_GANG',
    PUBLIC_GANG = 'PUBLIC_GANG',
    // 报听
    PUBLIC = 'PUBLIC',
    // 不要
    NONE = 'NONE'
}

enum HuType {
    GENERAL = 'GENERAL',

    // 清一色
    CLEAR = 'CLEAR',

    // 碰碰胡
    PENG_PENG_HU = 'PENG_PENG_HU',

    // 258
    TWO_FIVE_EIGHT = 'TWO_FIVE_EIGHT',

    // 七小对
    SEVEN_PAIR = 'SEVEN_PAIR',

    // 龙七对
    LOONG_SEVEN_PAIR = 'LOONG_SEVEN_PAIR',

    // 报听
    BAO_TING = 'BAO_TING',

    // 缺一门
    TWO_COLOR = 'TWO_COLOR',

    // 无将糊
    NO_JIANG = 'NO_JIANG',
}

interface LoseDetail {
    position: Position,
    operation: SupplierType,
    points: number
}


interface Mahjong {
    number: number,
    order: number,
    color: Color
}

interface InitSeatDTO {
    east: UserDTO,
    south: UserDTO,
    west: UserDTO,
    north: UserDTO,
    openUser: Position,
}

enum Color {
    // 万子
    WAN = 'WAN',
    // 条子
    TIAO = 'TIAO',
    // 饼子
    BING = 'BING',
    // 背部
    BACKGROUND = 'BACKGROUND'

}

enum Position {
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    NORTH = 'NORTH',
}

enum EndWay {
    HU = 'HU',
    NO_MAHJONG = 'NO_MAHJONG',
}

interface UserDTO {
    userCode: string,
    userName: string,
    nickName: string,
    avatar: string,
    userType: UserType
}

enum UserType {
    VIP = 'VIP',
    GENERAL = 'GENERAL',
    MANAGER = 'MANAGER',
}


export {
    ServerMessageType, MahjongMessageType,
    MahjongMessageEvent, Position, UserType,
    PLATFORM, CommunicateType, LeaseStatus, Color, EndWay, HuType, EventType
};
export type {
    ClientRequest,
    ClientMessage, MahjongMessage, MahjongInitRequestMessage,
    InitSeatDTO, UserDTO, TextMessage, MahjongOutResponseMessage, Mahjong,
    MahjongInitResponseMessage, MahjongChangeResponseMessage, MahjongErrorResponseMessage,
    MahjongSendLeaseResponseMessage, MahjongLeaseResponseMessage, MahjongEndResponseMessage,
    MahjongOutRequestMessage, EndDetail, EventMessage, RoomUserMessage, RoomChangePositionMessage,RoomInitMessage
};


