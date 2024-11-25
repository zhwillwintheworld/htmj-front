import {useContext, useEffect, useState} from 'react'
import Room from "./Room.tsx"
import EnterRoom from "./EnterRoom.tsx";
import {RoomContext} from "../../config/RoomContext.ts";
import {UserContext} from "../../config/UserContext.ts";
import UnLogin from "../user/UnLogin.tsx";

function Play() {
    const user = useContext(UserContext)
    const room = useContext(RoomContext)
    const [isVisible, setIsVisible] = useState(room?.onRoom != null && room.onRoom)
    const [isLogin, setIsLogin] = useState(user != null && user.userCode != null)
    useEffect(() => {
        console.log("room 发生变化",room)
        setIsVisible(room != null && room!.onRoom != null && room.onRoom)
        setIsLogin(user != null && user.userCode != null)
    }, [room, user]);
    return (
        <>
            <div>
                {isLogin ? isVisible ? <Room/> : <EnterRoom/> : <UnLogin/>}
            </div>
        </>
    )
}

export default Play
