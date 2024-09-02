import Chat from "./component/Chat.tsx";
import {TasksProvider} from "./component/TaskProvider.tsx";

function App() {
    return (
        <>
            <div>
                <TasksProvider>
                    <Chat></Chat>
                </TasksProvider>
            </div>

        </>
    )
}

export default App
