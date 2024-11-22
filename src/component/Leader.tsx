import {useContext, useEffect} from "react";
import {UserChangeContext} from "../config/UserContext.ts";
import {PLATFORM, UserType} from "../domain/Task.ts";
import {API_ROOM_INFO} from "../config/RequestConfig.ts";
import {RoomChangeContext} from "../config/RoomContext.ts";

type LeaderProps = {
    onInitialized: () => void
}

function Leader({onInitialized}: LeaderProps) {
    const userDispatch = useContext(UserChangeContext)!
    const roomDispatch = useContext(RoomChangeContext)!
    const userCode = localStorage.getItem("userCode")
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (userCode != null && token != null) {
            userDispatch({
                type: 'SET',
                payload: {
                    userCode: localStorage.getItem("userCode")!,
                    token: localStorage.getItem("token")!,
                    userType: UserType.GENERAL
                }
            })
            // 查询用户是否在房间内
            API_ROOM_INFO({
                userCode: userCode,
                platform: PLATFORM.WEB,
                app: 'mahjong'
            }).then(res => {
                if (res != null && res.onRoom) {
                    roomDispatch({
                        type: 'SET',
                        payload: res
                    })
                }
            })
        }
        console.log("Leader mounted")
        onInitialized()
    }, [userCode, token, userDispatch, onInitialized, roomDispatch]); // 确保依赖项正确

    return (
        <>

        </>
    )
}

export default Leader
