import Card from "./Card.tsx";
import {Mahjong, Position} from "../../domain/Task.ts";
import {LeaseStats} from "rsocket-core";

type SeatProps = {
    extra : Array<Mahjong>,
    publicList: Array<Mahjong>,
    out: Array<Mahjong>,
    seat: 'top' | 'bottom' | 'left' | 'right';
    position: Position;
    leaseStatus :LeaseStats,
    point: number,
    isPublic: boolean,
};

function UserSeat({out,publicList,extra,seat}: SeatProps) {
    const isHorizontal = seat === 'top' || seat === 'bottom';
    const direction = seat === 'top' ? 'column' : seat === 'bottom' ? 'column-reverse' : seat === 'left' ? 'row' : 'row-reverse';
    const isLeft = seat === 'left';
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{margin: '5px', display: 'flex',}}>
                    {/* 手牌区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isHorizontal ? 'row' : 'column',
                    }}>
                        {
                            extra.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}/>
                            ))
                        }
                    </div>
                </div>

                <div style={{margin: '5px', display: 'flex',}}>
                    {/* 碰牌区域 */}
                    <div style={{display: 'flex', flexDirection: isHorizontal ? 'row' : 'column',}}>
                        {
                            publicList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}/>
                            ))
                        }
                    </div>
                </div>

                <div style={{margin: '5px', display: 'flex',}}>
                    {/* 亍牌区域 */}
                    <div style={{display: 'flex', flexDirection: isHorizontal ? 'row' : 'column',}}>
                        {
                            out.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserSeat
