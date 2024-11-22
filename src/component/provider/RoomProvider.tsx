import {ReactNode, useReducer} from "react";
import {RoomChangeContext, RoomContext, roomReducer} from "../../config/RoomContext.ts";

// Provider 组件
interface TableProviderProps {
    children: ReactNode;
}

export const RoomProvider = ({children}: TableProviderProps) => {
    const [message, dispatch] = useReducer(roomReducer,null);
    return (
        <RoomContext.Provider value={message}>
            <RoomChangeContext.Provider value={dispatch}>
                {children}
            </RoomChangeContext.Provider>
        </RoomContext.Provider>
    );
};
