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
    const tasks = useContext(TableContext);
    if (tasks == null) {
        return <div>加载中...</div>
    }
    const queryParams = new URLSearchParams(location.search);
    const userCode = queryParams.get('userCode');
    if (userCode == null) {
        return <div>加载中...</div>
    }
    let currentSeat: Seat;
    if (tasks.east.user.userCode == userCode) {
        currentSeat = tasks.east;
    } else if (tasks.north.user.userCode == userCode) {
        currentSeat = tasks.north;
    } else if (tasks.south.user.userCode == userCode) {
        currentSeat = tasks.south;
    } else if (tasks.west.user.userCode == userCode) {
        currentSeat = tasks.west;
    } else {
        return <div>加载中...</div>
    }
    const bottomList = currentSeat.outList
    const bottom: SeatProps = {
        ...currentSeat,
        seat: 'bottom',
        leaseStatus: null
    }
    let nextSeat = getNextSeat(tasks, currentSeat.position);
    const rightList = nextSeat.outList
    const right: SeatProps = {
        ...nextSeat,
        seat: 'right',
        leaseStatus: null
    }
    nextSeat = getNextSeat(tasks, nextSeat.position);
    const topList = nextSeat.outList
    const top: SeatProps = {
        ...nextSeat,
        seat: 'top',
        leaseStatus: null
    }
    nextSeat = getNextSeat(tasks, nextSeat.position);
    const leftList = nextSeat.outList
    const left: SeatProps = {
        ...nextSeat,
        seat: 'left',
        leaseStatus: null
    }
    const center: CenterProps = {
        bottomList: bottomList,
        leftList: leftList,
        mahjong: null,
        position: Position.EAST,
        rightList: rightList,
        topList: topList,
        randomNumber: tasks.randomNumber
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
                height: '100vh'
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
