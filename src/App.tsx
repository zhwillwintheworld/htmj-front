import Chat from "./component/Chat.tsx";
import {TableProvider} from "./component/provider/TableProvider.tsx";
import {MessageProvider} from "./component/provider/MessageProvider.tsx";

function App() {
    return (
        <>
            <div>
                <TableProvider>
                    <MessageProvider>
                        <Chat/>
                    </MessageProvider>
                </TableProvider>
            </div>

        </>
    )
}

export default App
