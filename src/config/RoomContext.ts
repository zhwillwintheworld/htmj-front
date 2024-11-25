import React, {createContext} from 'react';
import {PlayerDTO, RoomInfoResponse} from "../domain/Response/RoomInfoResponse.ts";
import {Position, RoomChangePositionMessage, RoomInitMessage, RoomUserMessage} from "../domain/Task.ts";

export const RoomContext = createContext<RoomInfoResponse | null>(null);


// 上下文提供者组件
// 定义 TasksProvider 组件
type Action = { type: 'SET'; payload: RoomInfoResponse }
    | { type: 'RESET', payload: null }
    | { type: 'SELF_JOIN_ROOM', payload: RoomInitMessage }
    | { type: 'OTHER_JOIN_ROOM', payload: RoomUserMessage }
    | { type: 'LEAVE_ROOM', payload: RoomUserMessage | null}
    | { type: 'CHANGE_POSITION', payload: RoomChangePositionMessage }
    ;

export const RoomChangeContext = createContext<React.Dispatch<Action> | null>(null);

export function roomReducer(message: RoomInfoResponse | null, action: Action) {
    if (message == null && action.payload != null) {
        console.log("message is null but change not null")
    }
    if (action.type === 'SET') {
        return action.payload;
    } else if (action.type === "RESET") {
        return null;
    } else if (action.type === 'SELF_JOIN_ROOM' && action.payload != null) {
        return {...action.payload!};
    } else if (action.type === 'OTHER_JOIN_ROOM' && action.payload != null) {
        const newMessage = {...message!};
        if (action.payload.position == Position.EAST) {
            newMessage.roomTable!.east = {
                points: 0, user: action.payload.user,
            };
        } else if (action!.payload.position == Position.NORTH) {
            newMessage.roomTable!.north = {
                points: 0, user: action.payload.user,
            };
        } else if (action.payload.position == Position.SOUTH) {
            newMessage.roomTable!.south = {
                points: 0, user: action.payload.user,
            };
        } else if (action.payload.position == Position.WEST) {
            newMessage.roomTable!.west = {
                points: 0, user: action.payload.user,
            };
        }
        return newMessage;
    } else if (action.type === 'LEAVE_ROOM' && action.payload != null) {
        if (action.payload.user.userCode === localStorage.getItem("userCode")) {
            console.log("用户退出房间")
            return null
        } else {
            const newMessage = {...message!};
            if (action.payload.position == Position.EAST) {
                newMessage.roomTable!.east = null
            } else if (action.payload.position == Position.NORTH) {
                newMessage.roomTable!.north = null
            } else if (action.payload.position == Position.SOUTH) {
                newMessage.roomTable!.south = null
            } else if (action.payload.position == Position.WEST) {
                newMessage.roomTable!.west = null
            }
            return newMessage;
        }
    } else if (action.type === "CHANGE_POSITION") {
        const newMessage = {...message!};
        let user: PlayerDTO | null = null;
        if (action!.payload.position == Position.EAST) {
            user = newMessage.roomTable!.east!
            newMessage.roomTable!.east = null
        } else if (action!.payload.position == Position.NORTH) {
            user = newMessage.roomTable!.north!
            newMessage.roomTable!.north = null
        } else if (action!.payload.position == Position.SOUTH) {
            user = newMessage.roomTable!.south!
            newMessage.roomTable!.south = null
        } else if (action!.payload.position == Position.WEST) {
            user = newMessage.roomTable!.west!
            newMessage.roomTable!.west = null
        }
        if (action!.payload.targetPosition == Position.EAST) {
            newMessage.roomTable!.east = user
        } else if (action!.payload.targetPosition == Position.NORTH) {
            newMessage.roomTable!.north = user
        } else if (action!.payload.targetPosition == Position.SOUTH) {
            newMessage.roomTable!.south = user
        } else if (action!.payload.targetPosition == Position.WEST) {
            newMessage.roomTable!.west = user
        }
        return newMessage;
    } else {
        throw new Error(`Unhandled action type:`);
    }
}





