import {useContext, useEffect} from "react";
import {UserChangeContext} from "../config/UserContext.ts";
import {UserType} from "../domain/Task.ts";
import {API_ROOM_INFO, API_TABLE_INFO} from "../config/RequestConfig.ts";
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
            API_ROOM_INFO().then(res => {
                if (res != null && res.onRoom) {
                    roomDispatch({
                        type: 'SET',
                        payload: res
                    })
                }
            })
            // 查询用户是否在游戏内
            API_TABLE_INFO().then(res => {
                console.log("尝试连接房间", res)
            })
        }
        onInitialized()
    }, [userCode, token, userDispatch, onInitialized, roomDispatch]); // 确保依赖项正确

    return (
        <>

        </>
    )
}

export default Leader
