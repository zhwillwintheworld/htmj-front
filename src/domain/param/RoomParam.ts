import {RoomConfigDTO, RoomMode} from "../Response/RoomInfoResponse.ts";
import {Platform} from "../Common.ts";
import {Position} from "../Task.ts";

interface CreateRoomRequest {
    platform: Platform,
    app: string,
    roomName: string,
    roomMode: RoomMode
    password: string|null
    isPublic: boolean
    roomConfig: RoomConfigDTO | null
}

interface EnterRoomRequest{
     roomId: string,
     password: string|null
}

interface ExitRoomRequest{
     roomId: string,
}

interface ChangePositionRequest {
    roomId: string,
    position: Position
}

interface StartMahjongRequest {
    roomId: string,
}

export type{
    CreateRoomRequest,
    EnterRoomRequest,
    ExitRoomRequest,
    ChangePositionRequest,
    StartMahjongRequest
}
