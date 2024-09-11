import './table.css'
import UserSeat from "./UserSeat.tsx";
import {CenterProps, Seat, SeatProps, Table} from "../../domain/Table.ts";
import {Position} from "../../domain/Task.ts";
import {useLocation} from "react-router-dom";
import {useContext} from "react";
import {TableContext} from "../../config/TableContext.ts";
import TableCenter from "./TableCenter.tsx";

const getNextSeat = (table: Table, position: Position): Seat => {
    switch (position) {
        case Position.EAST:
            return table.north;
        case Position.NORTH:
            return table.west;
        case Position.SOUTH:
            return table.east;
        case Position.WEST:
            return table.south;
        default:
            throw new Error('Invalid position');
    }
}

function TableContent() {
    const location = useLocation();
    const tableProps = useContext(TableContext);
    if (tableProps == null) {
        console.log('tableProps is null')
        return <div>加载中...</div>
    }
    const queryParams = new URLSearchParams(location.search);
    const userCode = queryParams.get('userCode');
    if (userCode == null) {
        return <div>加载中...</div>
    }
    const table = tableProps.table
    let currentSeat: Seat;
    if (table.east.user.userCode == userCode) {
        currentSeat = table.east;
    } else if (table.north.user.userCode == userCode) {
        currentSeat = table.north;
    } else if (table.south.user.userCode == userCode) {
        currentSeat = table.south;
    } else if (table.west.user.userCode == userCode) {
        currentSeat = table.west;
    } else {
        return <div>加载中...</div>
    }
    const bottom: SeatProps = {
        ...currentSeat,
        seat: 'bottom',
    }
    let nextSeat = getNextSeat(table, currentSeat.position);
    const right: SeatProps = {
        ...nextSeat,
        seat: 'right',
    }
    nextSeat = getNextSeat(table, nextSeat.position);
    const top: SeatProps = {
        ...nextSeat,
        seat: 'top',
    }
    nextSeat = getNextSeat(table, nextSeat.position);
    const left: SeatProps = {
        ...nextSeat,
        seat: 'left',
    }
    const center: CenterProps = {
        randomNumber: table.randomNumber,
        displayUserPosition: bottom.position,
        displayUserCode: bottom.user.userCode,
    }
    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateAreas: `
        "left top right"
        "left center right"
        "left bottom right"
      `,
                backgroundColor: '#004d4c',
                gap: '10px',
                width: '100vw',
                height: '104vh'
            }}>
                <div style={{
                    gridArea: 'top', height: '30vh', justifyContent: 'center',
                    alignItems: 'center', display: 'flex',
                }}>
                    <UserSeat props={top}/>
                </div>
                <div style={{
                    gridArea: 'left', display: 'flex',
                    width: '30vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <UserSeat props={left}/>
                </div>
                <div style={{gridArea: 'center', width: '40vw', height: '40vh'}}>
                    <TableCenter props={center}/>
                </div>
                <div style={{
                    gridArea: 'right', display: 'flex',
                    width: '30vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <UserSeat props={right}/>
                </div>
                <div style={{gridArea: 'bottom', height: '30vh'}}>
                    <UserSeat props={bottom}/>
                </div>
            </div>

        </>
    )
}

export default TableContent
