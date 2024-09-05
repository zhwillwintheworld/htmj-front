import Card from "./Card.tsx";
import {SeatProps} from "../../domain/Table.ts";

function UserSeat({props}: { props: SeatProps }) {
    const seat = props.seat;
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
                            props.extraList.sort((a, b) => a.number - b.number).map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}/>
                            ))
                        }
                    </div>
                </div>

                <div style={{margin: '5px', display: 'flex',}}>
                    {/* 碰牌区域 */}
                    <div style={{display: 'flex', flexDirection: isHorizontal ? 'row' : 'column',}}>
                        {
                            props.publicList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}/>
                            ))
                        }
                    </div>
                </div>

                <div style={{margin: '5px', display: 'flex',}}>

                </div>
            </div>
        </>
    )
}

export default UserSeat
