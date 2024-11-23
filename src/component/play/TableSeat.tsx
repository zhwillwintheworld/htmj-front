import {Avatar, Button} from "antd";
import {Position} from "../../domain/Task.ts";
import {PlayerDTO} from "../../domain/Response/RoomInfoResponse.ts";
import {useContext} from "react";
import {UserContext} from "../../config/UserContext.ts";

type SeatProps = {
    position: Position;
    player: PlayerDTO | null;
}

function TableSeat({props}: { props: SeatProps }) {
    const current = useContext(UserContext)

    const isSelf = current!.userCode === props.player?.user.userCode;
    if (isSelf) {
        console.log("isSelf")
    }
    const isHorizontal = props.position === 'NORTH' || props.position === 'SOUTH';
    const direction = props.position === 'NORTH' ? 'column' : props.position === 'SOUTH' ? 'column-reverse' : props.position === 'WEST' ? 'row' : 'row-reverse';
    const handleClick = () => {
        if (isSelf) {
            return
        }

    }
    return (
        <>
            <div style={{
                display: 'flex',
                flexDirection: direction,
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <div style={{
                    display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center',
                    flexDirection: isHorizontal ? 'row' : 'column',

                }}>
                    {/* 头像区域 */}
                    <div>
                        <Button onClick={handleClick}>
                            {props.player ? <Avatar style={{backgroundColor: '#87d068'}}
                                                    size={45}

                                // icon={<UserOutlined/>}>
                            >
                                {props.player.user.userName}
                            </Avatar> : ''}
                        </Button>
                    </div>

                    <div style={{margin: '15px', color: 'white'}}>
                        积分： {props.player ? props.player.points : '0'}
                    </div>
                    <div style={{margin: '10px', color: 'white'}}>
                        方位：{props.position == Position.EAST ? '东' : props.position == Position.SOUTH ? '南' : props.position == Position.WEST ? '西' : '北'}
                    </div>

                </div>
            </div>
        </>
    )
}

export default TableSeat
