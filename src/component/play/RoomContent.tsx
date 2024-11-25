import {useContext} from "react";
import {RoomContext} from "../../config/RoomContext.ts";
import TableSeat from "./TableSeat.tsx";
import {Position} from "../../domain/Task.ts";
import {Button, Divider, message, Tag} from "antd";
import {API_EXIT_ROOM, API_START_GAME} from "../../config/RequestConfig.ts";
import {UserContext} from "../../config/UserContext.ts";

function RoomContent() {
    const room = useContext(RoomContext)
    const user = useContext(UserContext)
    const onclick = () => {
        API_EXIT_ROOM({
            userCode: user!.userCode,
            roomId: room!.roomBasic!.roomId,
        }).then(r => {
            console.log("退出房间", r)
        })
    }
    const startGame = () => {
        if(room!.roomTable ==null){
            message.error("环境未就绪").then(r => {console.log(r)})
        }
        const table = room!.roomTable!
        if(table.east == null || table.south == null || table.west == null || table.north == null){
            message.error("请等待其他玩家加入").then(r => {console.log(r)})
        }
        API_START_GAME({
            roomId: room!.roomBasic!.roomId,
            userCode: user!.userCode,
        }).then(r => {
            console.log("开始游戏", r)
        })
    }

    if (room == null || room.onRoom == null || !room.onRoom) {
        return <></>
    }
    const isManage = user!.userCode == room!.roomBasic!.master.userCode

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
                <div style={{
                    width: '95vw',
                    height: '3vh',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Tag color="magenta">房间ID：{room?.roomBasic?.roomId}</Tag>
                        <Tag color="red">房间名称：{room?.roomBasic?.roomName}</Tag>
                    </div>
                    <div>
                        {isManage ? <Button onClick={startGame} color="primary" variant="solid" >开始游戏</Button> : <></>}
                        <Button onClick={onclick} color="primary" variant="solid">退出房间</Button>
                    </div>
                </div>
                <Divider/>
                <div style={{
                    display: 'grid',
                    gridTemplateAreas: `
        "left top right"
        "left center right"
        "left bottom right"
      `,
                    gap: '10px',
                    width: '95vw',
                    height: '88vh'
                }}>
                    <div style={{
                        gridArea: 'top', height: '27vh', justifyContent: 'center',
                        alignItems: 'center', display: 'flex',
                    }}>
                        <TableSeat props={{
                            position: Position.NORTH,
                            player: room!.roomTable!.north,
                            roomId: room!.roomBasic!.roomId
                        }}/>
                    </div>
                    <div style={{
                        gridArea: 'left', display: 'flex',
                        width: '28vw',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TableSeat props={{
                            position: Position.WEST,
                            player: room!.roomTable!.west,
                            roomId: room!.roomBasic!.roomId
                        }}/>
                    </div>
                    <div style={{gridArea: 'center', width: '40vw', height: '35vh'}}>

                    </div>
                    <div style={{
                        gridArea: 'right', display: 'flex',
                        width: '28vw',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TableSeat props={{
                            position: Position.EAST,
                            player: room!.roomTable!.east,
                            roomId: room!.roomBasic!.roomId
                        }}/>
                    </div>
                    <div style={{gridArea: 'bottom', height: '27vh'}}>
                        <TableSeat props={{
                            position: Position.SOUTH,
                            player: room!.roomTable!.south,
                            roomId: room!.roomBasic!.roomId
                        }}/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RoomContent
