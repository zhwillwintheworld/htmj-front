import {RoomConfigDTO, RoomMode} from "../Response/RoomInfoResponse.ts";
import {Platform} from "../Common.ts";
import {Position} from "../Task.ts";

interface CreateRoomRequest {
    userCode: string,
    platform: Platform,
    app: string,
    roomName: string,
    roomMode: RoomMode
    password: string|null
    isPublic: boolean
    roomConfig: RoomConfigDTO | null
}

interface EnterRoomRequest{
     userCode: string,
     roomId: string,
     password: string|null
}

interface ExitRoomRequest{
     userCode: string,
     roomId: string,
}

interface ChangePositionRequest {
    userCode: string,
    roomId: string,
    position: Position
}

interface StartMahjongRequest {
    roomId: string,
    userCode: string
}

export type{
    CreateRoomRequest,
    EnterRoomRequest,
    ExitRoomRequest,
    ChangePositionRequest,
    StartMahjongRequest
}
