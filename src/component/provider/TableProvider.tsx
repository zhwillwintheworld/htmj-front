import {ReactNode, useReducer} from "react";
import {TableChangeContext, TableContext, tableReducer} from "../../config/TableContext.ts";

// Provider 组件
interface TableProviderProps {
    children: ReactNode;
}

export const TableProvider = ({children}: TableProviderProps) => {
    const [tasks, dispatch] = useReducer(tableReducer, null);

    return (
        <TableContext.Provider value={tasks}>
            <TableChangeContext.Provider value={dispatch}>
                {children}
            </TableChangeContext.Provider>
        </TableContext.Provider>
    );
};
