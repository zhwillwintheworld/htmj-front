import './table.css'; // 样式文件
import {Button} from 'antd';


// 定义麻将牌类型，可以扩展为更加具体的类型
interface Tile {
    id: number;
    symbol: string;
    type: 'hand' | 'discarded' | 'pung';
}

const topPlayerTiles: Tile[] = [
    {id: 1, symbol: '🀄', type: 'discarded'},
    {id: 2, symbol: '🀅', type: 'hand'},
    {id: 3, symbol: '🀆', type: 'hand'},
    {id: 4, symbol: '🀇', type: 'hand'},
    {id: 5, symbol: '1万', type: 'pung'}
];

const leftPlayerTiles: Tile[] = [
    {id: 6, symbol: '🀉', type: 'discarded'},
    {id: 7, symbol: '🀊', type: 'hand'},
    {id: 8, symbol: '🀋', type: 'hand'},
    {id: 9, symbol: '🀌', type: 'hand'},
    {id: 10, symbol: '🀍', type: 'pung'}
];

const rightPlayerTiles: Tile[] = [
    {id: 11, symbol: '🀎', type: 'discarded'},
    {id: 12, symbol: '🀏', type: 'hand'},
    {id: 13, symbol: '🀐', type: 'hand'},
    {id: 14, symbol: '🀑', type: 'hand'},
    {id: 15, symbol: '🀒', type: 'pung'}
];

const bottomPlayerTiles: Tile[] = [
    {id: 16, symbol: '🀓', type: 'discarded'},
    {id: 17, symbol: '🀔', type: 'hand'},
    {id: 18, symbol: '🀕', type: 'hand'},
    {id: 19, symbol: '🀖', type: 'hand'},
    {id: 20, symbol: '🀗', type: 'pung'}
];

const renderTiles = (tiles: Tile[], position: 'horizontal' | 'verticalLeft' | 'verticalRight') => {
    return (
        <div className={`tile-row ${position}`}>
            {tiles.map(tile => (
                <Button
                    key={tile.id}
                    className={`tile ${tile.type}`}
                    onMouseEnter={() => console.log('Hovering!')}
                >
                    {tile.symbol}
                </Button>
            ))}
        </div>
    );
};

function Table() {
    return (
        <>
            <div className="mahjong-table">
                <div className="player-area top">
                    {renderTiles(topPlayerTiles.filter(t => t.type === 'hand'), 'horizontal')}
                    {renderTiles(topPlayerTiles.filter(t => t.type === 'pung'), 'horizontal')}
                    {renderTiles(topPlayerTiles.filter(t => t.type === 'discarded'), 'horizontal')}
                </div>

                <div className="player-area left">
                    {renderTiles(leftPlayerTiles.filter(t => t.type === 'hand'), 'verticalLeft')}
                    {renderTiles(leftPlayerTiles.filter(t => t.type === 'pung'), 'verticalLeft')}
                    {renderTiles(leftPlayerTiles.filter(t => t.type === 'discarded'), 'verticalLeft')}
                </div>

                <div className="center-area">
                    <div className="game-info">北</div>
                </div>

                <div className="player-area right">
                    {renderTiles(rightPlayerTiles.filter(t => t.type === 'hand'), 'verticalRight')}
                    {renderTiles(rightPlayerTiles.filter(t => t.type === 'pung'), 'verticalRight')}
                    {renderTiles(rightPlayerTiles.filter(t => t.type === 'discarded'), 'verticalRight')}
                </div>

                <div className="player-area bottom">
                    {renderTiles(bottomPlayerTiles.filter(t => t.type === 'hand'), 'horizontal')}
                    {renderTiles(bottomPlayerTiles.filter(t => t.type === 'pung'), 'horizontal')}
                    {renderTiles(bottomPlayerTiles.filter(t => t.type === 'discarded'), 'horizontal')}
                </div>
            </div>
        </>
    )
}

export default Table;
