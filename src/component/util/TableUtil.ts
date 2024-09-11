import {Seat, Table, TableProps} from "../../domain/Table.ts";
import {
    LeaseStatus, Mahjong,
    MahjongChangeResponseMessage, MahjongInitResponseMessage,
    MahjongLeaseResponseMessage,
    MahjongOutResponseMessage,
    MahjongSendLeaseResponseMessage,
    Position
} from "../../domain/Task.ts";

export const initTableProp = (message: MahjongInitResponseMessage, userCode: string): TableProps => {
    const table = message.table;
    const canOut = table.currentSeat.user.userCode == userCode;
    return {
        canLease: false,
        canOut,
        leaseNumber: table.leaseNumber,
        leaseStatus: [],
        table: table,
        taskId: message.taskId,
        timeLimit: message.timeLimit,
        displayMahjong: null,
        displayLeaseStatus: null
    }
}

const getSeatByPosition = (table: Table, position: Position): Seat => {
    switch (position) {
        case Position.EAST:
            return table.east;
        case Position.NORTH:
            return table.north;
        case Position.SOUTH:
            return table.south;
        case Position.WEST:
            return table.west;
    }
}

export const getNextSeat = (table: Table, position: Position): Seat => {
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

export const changeTableProp = (tableProps: TableProps, message: MahjongChangeResponseMessage, userCode: string): TableProps => {
    const table: Table = tableProps.table;
    table.step = message.step;
    table.currentSeat = getSeatByPosition(table, message.position)
    table.currentSeat.catch = message.mahjong
    const canOut = table.currentSeat.user.userCode == userCode;
    return {
        canLease: false,
        canOut: canOut,
        leaseNumber: table.leaseNumber,
        leaseStatus: [],
        table: table,
        taskId: message.taskId,
        timeLimit: message.timeLimit,
        displayMahjong: null,
        displayLeaseStatus: null
    }
}

export const outTableProp = (tableProps: TableProps, message: MahjongOutResponseMessage): TableProps => {
    const table: Table = tableProps.table;
    const currentSeat = getSeatByPosition(table, message.position)
    currentSeat.extraList = table.currentSeat.extraList.filter(m => m.order != message.mahjong.order)
    if (currentSeat.catch != null && message.mahjong.order != currentSeat.catch!.order) {
        currentSeat.extraList.push(currentSeat.catch)
    }
    table.currentSeat.catch = null
    currentSeat.outList.push(message.mahjong)
    return {
        canLease: false,
        canOut: false,
        leaseNumber: table.leaseNumber,
        leaseStatus: [],
        table: table,
        taskId: null,
        timeLimit: 0,
        displayMahjong: message.mahjong,
        displayLeaseStatus: null
    }
}
export const leaseTableProp = (tableProps: TableProps, message: MahjongLeaseResponseMessage): TableProps => {
    const table: Table = tableProps.table;
    const status = message.status
    if (status == LeaseStatus.HU) {
        return tableProps
    }
    const mahjong = message.mahjong
    const receiveUser = getSeatByPosition(table, message.receiveUser[0])
    const happenedUser = getSeatByPosition(table, message.happenedUser)
    let nextUser: Seat
    let size: Array<Mahjong>
    switch (status) {
        case LeaseStatus.PUBLIC:
            receiveUser.isPublic = true
            table.currentSeat = receiveUser
            break
        case LeaseStatus.GANG:
            receiveUser.publicList.push(mahjong, ...happenedUser.extraList.filter(m => m.number == mahjong.number))
            receiveUser.extraList = happenedUser.extraList.filter(m => m.number != mahjong.number)
            receiveUser.points += 3
            happenedUser.points -= 3
            table.currentSeat = receiveUser
            break
        case LeaseStatus.PENG:
            size = receiveUser.extraList.filter(m => m.number == mahjong.number)
            receiveUser.extraList = receiveUser.extraList.filter(m => m.number != mahjong.number)
            if (size.length == 2) {
                receiveUser.publicList.push(mahjong, ...size)
            } else {
                receiveUser.publicList.push(...size)
                receiveUser.extraList.push(mahjong)
            }
            table.currentSeat = receiveUser
            break
        case LeaseStatus.PRIVATE_GANG:
            happenedUser.publicList.push(...happenedUser.extraList.filter(m => m.number == mahjong.number))
            happenedUser.extraList = happenedUser.extraList.filter(m => m.number != mahjong.number)
            happenedUser.points += 6
            nextUser = getNextSeat(table, happenedUser.position)
            while (nextUser.position != happenedUser.position) {
                nextUser.points -= 2
                nextUser = getNextSeat(table, nextUser.position)
            }
            table.currentSeat = happenedUser
            break
        case LeaseStatus.PUBLIC_GANG:
            happenedUser.publicList.push(mahjong)
            happenedUser.points += 3
            nextUser = getNextSeat(table, happenedUser.position)
            while (nextUser.position != happenedUser.position) {
                nextUser.points -= 1
                nextUser = getNextSeat(table, nextUser.position)
            }
            table.currentSeat = happenedUser
            break
    }
    return {
        canLease: false,
        canOut: false,
        leaseNumber: message.leaseNumber,
        leaseStatus: [],
        table: table,
        taskId: null,
        timeLimit: 0,
        displayMahjong: message.mahjong,
        displayLeaseStatus: message.status
    }
}

export const sendLeaseTableProp = (tableProps: TableProps, message: MahjongSendLeaseResponseMessage): TableProps => {
    const table: Table = tableProps.table;
    return {
        canLease: true,
        canOut: false,
        leaseNumber: message.leaseNumber,
        leaseStatus: message.statusList,
        table: table,
        taskId: message.taskId,
        timeLimit: message.timeLimit,
        displayMahjong: message.mahjong,
        displayLeaseStatus: null
    }
}