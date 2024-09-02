import {Table} from "./Table.ts";

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
}

interface MahjongMessage {
    type: MahjongMessageType;
    event: MahjongMessageEvent;
    content: MahjongInitRequestMessage | MahjongOutResponseMessage | MahjongInitResponseMessage;
}

interface TextMessage {
    text: string
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

interface MahjongInitResponseMessage {
    timeLimit: number,
    table: Table,
    taskId: String
}

interface MahjongOutResponseMessage {
    position: Position,
    mahjong: Mahjong,
    table: Table,
}


interface Mahjong {
    number: number,
}

interface InitSeatDTO {
    east: UserDTO,
    south: UserDTO,
    west: UserDTO,
    north: UserDTO,
    openUser: Position,
}


enum Position {
    EAST = 'EAST',
    SOUTH = 'SOUTH',
    WEST = 'WEST',
    NORTH = 'NORTH',
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
    PLATFORM, CommunicateType
};
export type {
    ClientRequest,
    ClientMessage, MahjongMessage, MahjongInitRequestMessage,
    InitSeatDTO, UserDTO, TextMessage, MahjongOutResponseMessage, Mahjong,
    MahjongInitResponseMessage
};


