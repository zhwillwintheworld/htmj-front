import {ReactNode, useReducer} from "react";
import {UserChangeContext, UserContext, userReducer} from "../../config/UserContext.ts";

// Provider 组件
interface TableProviderProps {
    children: ReactNode;
}

export const UserProvider = ({children}: TableProviderProps) => {
    const [message, dispatch] = useReducer(userReducer,null);
    return (
        <UserContext.Provider value={message}>
            <UserChangeContext.Provider value={dispatch}>
                {children}
            </UserChangeContext.Provider>
        </UserContext.Provider>
    );
};
