import {createContext, ReactNode, useContext, useReducer} from 'react';
import {Table} from "../domain/Table.ts";

const TableContext = createContext(null);
const TableChangeContext = createContext(null);


// 上下文提供者组件
    // 定义 TasksProvider 组件
    export const TasksProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
        const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

        return (
            <TableContext.Provider value={tasks}>
                <TableChangeContext.Provider value={dispatch}>
                    {children}
                </TableChangeContext.Provider>
            </TableContext.Provider>
        );
    };


export function useTasks() {
    return useContext(TableContext);
}

export function useTasksDispatch() {
    return useContext(TasksDispatchContext);
}

function tableReducer(table, action) {

}

const table: Table = {};
