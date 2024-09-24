import Card from "./Card.tsx";
import {SeatProps} from "../../domain/Table.ts";
import {Avatar} from "antd";
import {useContext, useEffect, useState} from "react";
import {TableContext} from "../../config/TableContext.ts";
import {MessageContext} from "../../config/MessageContext.ts";
import {makeMessage, makeOutTaskMessage, makeTaskPayload} from "../util/MessageUtil.ts";
import {Mahjong, Position} from "../../domain/Task.ts";

function UserSeat({props}: { props: SeatProps }) {
    const tableProps = useContext(TableContext)!;
    const message = useContext(MessageContext)
    if (message == null) {
        console.log("message is null")
    }
    const table = tableProps.table!
    const [selectedCardIndex, setSelectedCardIndex] = useState<number>(-1); // 用于跟踪选中的 card

    useEffect(() => {
        if (!tableProps.canOut) {
            setSelectedCardIndex(-1)
        }
    }, [tableProps.canOut])
    const handleSelect = (index: number) => {
        if (!tableProps.canOut) {
            return;
        }
        setSelectedCardIndex(index); // 更新选中的 card
    };
    const handleConfirm = (it: Mahjong) => {
        if (!tableProps.canOut) {
            return;
        }
        const messageContent = makeMessage(props.user.userCode, "1", makeOutTaskMessage(
            it, props.position,
            table.tableId, tableProps.taskId!,
            table.step
        ))
        // 去除选中
        setSelectedCardIndex(-1)
        message?.onNext(makeTaskPayload(messageContent))
        console.log(`Card ${it.number} confirmed!`);
    };
    const currentSeat = table.currentSeat;
    const isSelf = currentSeat.user.userCode === props.user.userCode;
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
                backgroundColor: isSelf ? 'rgba(5,196,199,0.76)' : '#004d4c',
            }}>
                <div style={{
                    display: 'flex', margin: '20px', justifyContent: 'center', alignItems: 'center',
                    flexDirection: isHorizontal ? 'row' : 'column',

                }}>
                    {/* 头像区域 */}
                    <div>
                        <Avatar style={{backgroundColor: '#87d068'}}
                                size={45}
                            // icon={<UserOutlined/>}>
                        >
                            {props.user.userName}
                        </Avatar>
                    </div>

                    <div style={{margin: '15px', color: 'white'}}>
                        积分： {props.points}
                    </div>
                    <div style={{margin: '10px', color: 'white'}}>
                        方位：{props.position == Position.EAST ? '东' : props.position == Position.SOUTH ? '南' : props.position == Position.WEST ? '西' : '北'}
                    </div>

                </div>
                <div style={{display: 'flex',}}>
                    {/* 手牌区域 */}
                    <div style={{
                        display: 'flex',
                        flexDirection: isHorizontal ? 'row' : 'column',
                    }}>
                        {
                            props.extraList.sort((a, b) => a.number - b.number).map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}
                                      isSelected={selectedCardIndex === item.order}
                                      onSelect={() => handleSelect(item.order)}
                                      onConfirm={() => handleConfirm(item)}
                                />
                            ))
                        }

                    </div>


                    {
                        props.catch ? (
                            <div style={{
                                display: 'flex',
                                flexDirection: isHorizontal ? 'row' : 'column',
                                transform: 'skew(20deg)'
                            }}>
                                <Card key={props.catch.order} value={props.catch.number} isHorizontal={isHorizontal}
                                      isLeft={isLeft}
                                      isSelected={selectedCardIndex === props.catch.order}
                                      onSelect={() => handleSelect(props.catch!.order)}
                                      onConfirm={() => handleConfirm(props.catch!)}/>
                            </div>

                        ) : <></>
                    }


                </div>

                <div style={{margin: '30px', display: 'flex',}}>
                    {/* 出牌区域 */}
                    <div style={{display: 'flex', flexDirection: isHorizontal ? 'row' : 'column',}}>
                        {
                            props.outList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={isHorizontal} isLeft={isLeft}
                                      isSelected={false} onConfirm={() => {
                                }} onSelect={() => {
                                }}
                                />
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
