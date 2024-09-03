import './table.css'; // 样式文件
import {Button} from 'antd';
import {TableContext} from '../../config/TableContext'
import {useContext} from "react";
import {useLocation} from "react-router-dom";
import {Seat, Table} from "../../domain/Table.ts";
import {Mahjong, Position} from "../../domain/Task.ts";

// 定义麻将牌类型，可以扩展为更加具体的类型
interface Tile {
    id: number;
    symbol: string;
    order: number;
    type: 'hand' | 'discarded' | 'pung';
}

const getTiles = (mah: Mahjong, type: 'hand' | 'discarded' | 'pung'): Tile => {
    const count = mah.number;
    if(count == 0){
        return {
            id: 0,
            symbol: '',
            order: mah.order,
            type
        };
    }
    if (count < 10) {
        return {
            id: count,
            symbol: String(count + '万'),
            order: mah.order,
            type,

        };
    } else if (count < 20) {
        return {
            id: count,
            symbol: String(count - 10 + '条'),
            order: mah.order,
            type
        };
    } else {
        return {
            id: count,
            symbol: String(count - 20 + '筒'),
            order: mah.order,
            type
        };
    }
}

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
const renderTiles = (tiles: Tile[], position: 'horizontal' | 'verticalLeft' | 'verticalRight') => {
    return (
        <div className={`tile-row ${position}`}>
            {tiles.map(tile => (
                <Button
                    key={tile.order}
                    className={`tile ${tile.type}`}
                    onMouseEnter={() => console.log('Hovering!')}
                >
                    {tile.symbol}
                </Button>
            ))}
        </div>
    );
};

function TableUI() {

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
    const bottomExtra = currentSeat.extraList.map(id => getTiles(id, 'hand'))
    const bottomPublic = currentSeat.publicList.map(id => getTiles(id, 'pung'));
    const bottomOut = currentSeat.outList.map(id => getTiles(id, 'discarded'));
    const second = getNextSeat(tasks, currentSeat.position);
    const rightExtra = second.extraList.map(id => getTiles(id, 'hand'))
    const rightPublic = second.publicList.map(id => getTiles(id, 'pung'));
    const rightOut = second.outList.map(id => getTiles(id, 'discarded'));
    const third = getNextSeat(tasks, second.position);
    const topExtra = third.extraList.map(id => getTiles(id, 'hand'))
    const topPublic = third.publicList.map(id => getTiles(id, 'pung'));
    const topOut = third.outList.map(id => getTiles(id, 'discarded'));
    const fourth = getNextSeat(tasks, third.position);
    const leftExtra = fourth.extraList.map(id => getTiles(id, 'hand'))
    const leftPublic = fourth.publicList.map(id => getTiles(id, 'pung'));
    const leftOut = fourth.outList.map(id => getTiles(id, 'discarded'));


    return (
        <>
            <div className="mahjong-table">
                <div className="player-area top">
                    {renderTiles(topExtra, 'horizontal')}
                    {renderTiles(topPublic, 'horizontal')}
                    {renderTiles(topOut, 'horizontal')}
                </div>

                <div className="player-area left">
                    {renderTiles(leftExtra, 'verticalLeft')}
                    {renderTiles(leftPublic, 'verticalLeft')}
                    {renderTiles(leftOut, 'verticalLeft')}
                </div>

                <div className="center-area">
                    <div className="game-info">北</div>
                </div>

                <div className="player-area right">
                    {renderTiles(rightExtra, 'verticalRight')}
                    {renderTiles(rightPublic, 'verticalRight')}
                    {renderTiles(rightOut, 'verticalRight')}
                </div>

                <div className="player-area bottom">
                    {renderTiles(bottomExtra, 'horizontal')}
                    {renderTiles(bottomPublic, 'horizontal')}
                    {renderTiles(bottomOut, 'horizontal')}
                </div>
            </div>
        </>
    )
}

export default TableUI;
