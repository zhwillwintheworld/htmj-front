import {ReactNode, useReducer} from "react";
import {MessageChangeContext, MessageContext, messageReducer} from "../../config/MessageContext.ts";

// Provider 组件
interface TableProviderProps {
    children: ReactNode;
}

export const MessageProvider = ({children}: TableProviderProps) => {
    const [message, dispatch] = useReducer(messageReducer,null);
    return (
        <MessageContext.Provider value={message}>
            <MessageChangeContext.Provider value={dispatch}>
                {children}
            </MessageChangeContext.Provider>
        </MessageContext.Provider>
    );
};