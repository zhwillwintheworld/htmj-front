import Card from "./Card.tsx";
import {SeatProps} from "../../domain/Table.ts";
import {Avatar} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useContext, useState} from "react";
import {TableContext} from "../../config/TableContext.ts";
import {MessageContext} from "../../config/MessageContext.ts";
import {makeMessage, makeOutTaskMessage, makeTaskPayload} from "../util/MessageUtil.ts";


function UserSeat({props}: { props: SeatProps }) {
    const tasks = useContext(TableContext);
    const message = useContext(MessageContext)
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null); // 用于跟踪选中的 card
    const handleSelect = (index: number) => {
        setSelectedCardIndex(index); // 更新选中的 card
    };
    const handleConfirm = (index: number, order: number) => {
        message?.onNext(makeTaskPayload(makeMessage("1", "1", makeOutTaskMessage(
            index, order, props.position,
            props.tableId, props.taskId,
            props.tableStep, props.step
        ))))
        console.log(`Card ${index + 1} confirmed!`);
    };
    if (tasks == null) {
        return <div>加载中...</div>
    }
    const currentSeat = tasks.currentSeat;
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
                backgroundColor: isSelf ? '#4D4700' : '#004d4c',
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
                                      onConfirm={() => handleConfirm(item.number, item.order)}
                                />
                            ))
                        }
                    </div>
                </div>

                <div style={{margin: '30px', display: 'flex',}}>
                    {/* 碰牌区域 */}
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
