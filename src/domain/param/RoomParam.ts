import {RoomConfigDTO, RoomMode} from "../Response/RoomInfoResponse.ts";
import {Platform} from "../Common.ts";

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

export type{
    CreateRoomRequest,
    EnterRoomRequest
}
