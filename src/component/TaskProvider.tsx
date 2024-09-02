import {ReactNode, useReducer} from "react";
import {table, tableReducer, TableContext, TableChangeContext} from "../config/TableContext.ts";

// Provider 组件
interface TableProviderProps {
    children: ReactNode;
}

export const TasksProvider = ({children}: TableProviderProps) => {
    const [tasks, dispatch] = useReducer(tableReducer, table);

    return (
        <TableContext.Provider value={tasks}>
            <TableChangeContext.Provider value={dispatch}>
                {children}
            </TableChangeContext.Provider>
        </TableContext.Provider>
    );
};