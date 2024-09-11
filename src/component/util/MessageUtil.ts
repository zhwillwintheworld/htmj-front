import {
    ClientRequest,
    CommunicateType,
    LeaseStatus, Mahjong,
    MahjongMessage,
    MahjongMessageEvent,
    MahjongMessageType,
    PLATFORM,
    Position,
    ServerMessageType,
    UserType
} from "../../domain/Task.ts";
import {Payload} from "rsocket-types";
import {Buffer} from "buffer";
import {encodeCompositeMetadata, encodeRoute, MESSAGE_RSOCKET_ROUTING} from "rsocket-core";

export const makeTaskPayload = (clientRequest: ClientRequest): Payload<Buffer, Buffer> => {
    return {
        data: Buffer.from(JSON.stringify(clientRequest)),
        metadata: encodeCompositeMetadata([
            [MESSAGE_RSOCKET_ROUTING, encodeRoute("im.v1.task")],
        ]),
    }
}
export const makeOutTaskMessage = (mahjong: Mahjong, position: Position,
                                   tableId: string, taskId: string, tableStep: number): MahjongMessage => {
    return {
        type: MahjongMessageType.REQUEST,
        event: MahjongMessageEvent.OUT_REQUEST,
        content: {
            mahjong,
            position,
            tableId,
            taskId,
            step:tableStep,
        },
    }
}

export const makeLeaseTaskMessage = (tableId: string,
                                     status: LeaseStatus,
                                     leaseNumber: number,
                                     position: Position,
                                     taskId: string): MahjongMessage => {
    return {
        type: MahjongMessageType.REQUEST,
        event: MahjongMessageEvent.LEASE_REQUEST,
        content: {
            tableId,
            status,
            leaseNumber,
            position,
            taskId
        },
    }
}

export const makeInitTaskMessage = (): MahjongMessage => {
    return {
        type: MahjongMessageType.REQUEST,
        event: MahjongMessageEvent.INIT_REQUEST,
        content: {
            roomId: '1',
            seatInfo: {
                east: {
                    userCode: '1',
                    userName: '华少神临',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                south: {
                    userCode: '2',
                    userName: '许馨元',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                west: {
                    userCode: '3',
                    userName: '张梓婷',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                north: {
                    userCode: '4',
                    userName: '小胡',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                openUser: Position.EAST
            },
            tableId: '1'
        }
    }
}

export const makeMessage = (userCode: string, token: string, message: MahjongMessage): ClientRequest => {
    return {
        traceId: new Date().valueOf() + "",
        createTime: new Date().valueOf(),
        userCode,
        token,
        platform: PLATFORM.WEB,
        communicateType: CommunicateType.ROOM,
        communicateUserCode: '',
        communicateRoomCode: '1',
        communicateGroupCode: '',
        message: {
            messageType: ServerMessageType.MAHJONG,
            messageContent: message
        }
    }
}