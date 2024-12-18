import TableContent from "../table/TableContent.tsx";
import {TableContext} from "../../config/TableContext.ts";
import {useContext} from "react";
import RoomContent from "./RoomContent.tsx";

function Room() {
    const tableContext = useContext(TableContext);
    const tableFlag = tableContext != null && tableContext.table != null
    return (
        <>
            <div>
                {tableFlag ? <TableContent/> : <RoomContent/>}
            </div>
        </>
    )
}

export default Room
