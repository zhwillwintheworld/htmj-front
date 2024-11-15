import {useContext, useEffect} from "react";
import {UserChangeContext} from "../config/UserContext.ts";
import {UserType} from "../domain/Task.ts";

type LeaderProps = {
    onInitialized: () => void
}

function Leader({onInitialized}: LeaderProps) {
    const userDispatch = useContext(UserChangeContext)!
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
        }
        console.log("Leader mounted")
        onInitialized()
    }, [userCode, token, userDispatch, onInitialized]); // 确保依赖项正确

    return (
        <>

        </>
    )
}

export default Leader
