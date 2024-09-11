import Card from "./Card.tsx";
import {SeatProps} from "../../domain/Table.ts";
import {Avatar} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useContext, useState} from "react";
import {TableContext} from "../../config/TableContext.ts";
import {MessageContext} from "../../config/MessageContext.ts";
import {makeMessage, makeOutTaskMessage, makeTaskPayload} from "../util/MessageUtil.ts";
import {Mahjong} from "../../domain/Task.ts";

function UserSeat({props}: { props: SeatProps }) {
    const tableProps = useContext(TableContext)!;
    const message = useContext(MessageContext)
    if (message == null) {
        console.log("message is null")
    }
    const table = tableProps.table!
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null); // 用于跟踪选中的 card
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
        console.log("消息发送器状态是否为空" + message == null)
        console.log("消息体为" + JSON.stringify(messageContent))
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
                <div style={{display: 'flex', margin: '20px'}}>
                    {/* 头像区域 */}
                    <Avatar style={{backgroundColor: '#87d068'}} icon={<UserOutlined/>}/>

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
                        {
                            props.catch ? (
                                <Card key={props.catch.order} value={props.catch.number} isHorizontal={isHorizontal}
                                      isLeft={isLeft}
                                      isSelected={selectedCardIndex === props.catch.order}
                                      onSelect={() => handleSelect(props.catch!.order)}
                                      onConfirm={() => handleConfirm(props.catch!)}/>
                            ) : <></>
                        }
                    </div>

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
