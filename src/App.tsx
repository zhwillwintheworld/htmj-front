import Chat from "./component/Chat.tsx";
import {TableProvider} from "./component/provider/TableProvider.tsx";

function App() {
    return (
        <>
            <div>
                <TableProvider>
                    <Chat></Chat>
                </TableProvider>
            </div>

        </>
    )
}

export default App
