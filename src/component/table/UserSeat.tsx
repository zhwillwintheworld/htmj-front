import Card from "./Card.tsx";

type SeatProps = {
    position: 'top' | 'bottom' | 'left' | 'right';
};

function UserSeat({position}: SeatProps) {
    const isHorizontal = position === 'top' || position === 'bottom';
    const direction = position === 'top' ? 'column' : position === 'bottom' ? 'column-reverse' : position === 'left' ? 'row' : 'row-reverse';
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{margin: '10px'}}>
                    {/* 手牌区域 */}
                    <div style={{display: 'flex', flexDirection: isHorizontal ? 'row' : 'column'}}>
                        <Card value="🀇" isHorizontal={isHorizontal}/>
                        <Card value="🀈" isHorizontal={isHorizontal}/>
                        <Card value="🀉" isHorizontal={isHorizontal}/>
                    </div>
                </div>

                <div style={{margin: '10px'}}>
                    {/* 碰牌区域 */}
                    <div style={{display: 'flex', flexDirection: isHorizontal ? 'row' : 'column'}}>
                        <Card value="🀄" isHorizontal={isHorizontal}/>
                        <Card value="🀅" isHorizontal={isHorizontal}/>
                        <Card value="🀆" isHorizontal={isHorizontal}/>
                    </div>
                </div>

                <div style={{margin: '10px'}}>
                    {/* 悬浮按钮区域 */}
                    <button>操作</button>
                </div>
            </div>
        </>
    )
}

export default UserSeat
