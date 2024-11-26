import {Avatar, Button} from "antd";
import {Position} from "../../domain/Task.ts";
import {PlayerDTO} from "../../domain/Response/RoomInfoResponse.ts";
import {useContext} from "react";
import {UserContext} from "../../config/UserContext.ts";
import {API_CHANGE_POSITION} from "../../config/RequestConfig.ts";

type SeatProps = {
    position: Position;
    player: PlayerDTO | null;
    roomId: string;
}

function TableSeat({props}: { props: SeatProps }) {
    const current = useContext(UserContext)

    const isSelf = current!.userCode === props.player?.user.userCode;

    const isHorizontal = props.position === 'NORTH' || props.position === 'SOUTH';
    const direction = props.position === 'NORTH' ? 'column' : props.position === 'SOUTH' ? 'column-reverse' : props.position === 'WEST' ? 'row' : 'row-reverse';
    const handleClick = () => {
        if (isSelf) {
            return
        }
        if (props.player != null && props.player.user != null) {
            return;
        }
        API_CHANGE_POSITION({
            roomId: props.roomId,
            position: props.position,
        }).then(r => {
            console.log("换位置", r)
        })

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
                        <Button onClick={handleClick} shape="circle">
                            {props.player ? <Avatar style={{backgroundColor: '#87d068'}}
                                                    size={45}

                                // icon={<UserOutlined/>}>
                            >
                                {props.player.user.userName}
                            </Avatar> : '空'}
                        </Button>
                    </div>

                    <div style={{margin: '15px'}}>
                        积分： {props.player ? props.player.points : '0'}
                    </div>
                    <div style={{margin: '10px'}}>
                        方位：{props.position == Position.EAST ? '东' : props.position == Position.SOUTH ? '南' : props.position == Position.WEST ? '西' : '北'}
                    </div>

                </div>
            </div>
        </>
    )
}

export default TableSeat
