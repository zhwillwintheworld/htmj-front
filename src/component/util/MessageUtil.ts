import {
    ClientRequest,
    CommunicateType, MahjongMessage,
    MahjongMessageEvent,
    MahjongMessageType,
    PLATFORM, Position,
    ServerMessageType, UserType
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
export const makeOutTaskMessage = (number: number, order: number, position: Position,
                                   tableId: string, taskId: string, tableStep: number, seatStep: number): MahjongMessage => {
    return {
        type: MahjongMessageType.REQUEST,
        event: MahjongMessageEvent.OUT_REQUEST,
        content: {
            mahjong: {
                number,
                order,
            },
            position,
            tableId,
            taskId,
            tableStep,
            seatStep,
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
                    userName: '',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                south: {
                    userCode: '2',
                    userName: '',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                west: {
                    userCode: '3',
                    userName: '',
                    nickName: '',
                    avatar: '',
                    userType: UserType.MANAGER
                },
                north: {
                    userCode: '4',
                    userName: '',
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