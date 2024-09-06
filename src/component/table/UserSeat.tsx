import Card from "./Card.tsx";
import {SeatProps} from "../../domain/Table.ts";
import {Avatar, Button, Modal} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {useContext, useState} from "react";
import {TableContext} from "../../config/TableContext.ts";
import {MessageContext} from "../../config/MessageContext.ts";
import {makeLeaseTaskMessage, makeMessage, makeOutTaskMessage, makeTaskPayload} from "../util/MessageUtil.ts";
import {LeaseStatus} from "../../domain/Task.ts";

function UserSeat({props}: { props: SeatProps }) {
    const tableProps = useContext(TableContext)!;
    const message = useContext(MessageContext)
    const table = tableProps.table!
    const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null); // 用于跟踪选中的 card
    const [isModalOpen, setIsModalOpen] = useState(true)
    const handleSelect = (index: number) => {
        if (!tableProps.canOut) {
            return;
        }
        setSelectedCardIndex(index); // 更新选中的 card
    };

    const handleLease = (leaseStatus: LeaseStatus) => {
        if (!tableProps.canLease) {
            return;
        }
        message?.onNext(makeTaskPayload(makeMessage(props.user.userCode, "1", makeLeaseTaskMessage(
            table.tableId, leaseStatus, tableProps.leaseNumber, props.position, tableProps.taskId!)
        )))
        setIsModalOpen(false)
    };
    const handleConfirm = (index: number, order: number) => {
        if (!tableProps.canOut) {
            return;
        }
        message?.onNext(makeTaskPayload(makeMessage(props.user.userCode, "1", makeOutTaskMessage(
            index, order, props.position,
            table.tableId, tableProps.taskId!,
            table.step
        ))))
        console.log(`Card ${index + 1} confirmed!`);
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

                    <Modal title="做出你的选择" open={isModalOpen} footer={null}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {
                                tableProps.leaseStatus?.map(
                                    (item) => (
                                        <Button onClick={() => handleLease(item)} type="primary"
                                                style={{marginLeft: '10px'}}>
                                            <span>{
                                                item === LeaseStatus.PUBLIC ? '报听' : item === LeaseStatus.PENG ? '碰' : item === LeaseStatus.HU ? '胡' : item === LeaseStatus.NONE ? '不要' : '杠'
                                            }</span>
                                        </Button>
                                    )
                                )
                            }
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default UserSeat
