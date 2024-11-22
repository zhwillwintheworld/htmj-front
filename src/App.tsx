import {TableProvider} from "./component/provider/TableProvider.tsx";
import {MessageProvider} from "./component/provider/MessageProvider.tsx";
import {UserProvider} from "./component/provider/UserProvider.tsx";
import Leader from "./component/Leader.tsx";
import {useState} from "react";
import Chat from "./component/Chat.tsx";
import {RoomProvider} from "./component/provider/RoomProvider.tsx";

function App() {
    const [isInitialized, setIsInitialized] = useState(false);

    const handleInitialized = () => {
        setIsInitialized(true);
    };
    return (
        <>
            <UserProvider>
                <MessageProvider>
                    <RoomProvider>
                        <TableProvider>
                            {!isInitialized ? (
                                <Leader onInitialized={handleInitialized}/>
                            ) : (
                                <Chat/>
                            )}
                        </TableProvider>
                    </RoomProvider>
                </MessageProvider>
            </UserProvider>
        </>
    )
}

export default App
