import {CenterProps} from "../../domain/Table.ts";
import {Button, Modal} from "antd";
import {LeaseStatus} from "../../domain/Task.ts";
import {makeLeaseTaskMessage, makeMessage, makeTaskPayload} from "../util/MessageUtil.ts";
import {useContext, useEffect, useState} from "react";
import {TableContext} from "../../config/TableContext.ts";
import {MessageContext} from "../../config/MessageContext.ts";

function TableCenter({props}: { props: CenterProps }) {
    const tableProps = useContext(TableContext)!;
    const message = useContext(MessageContext)
    if (message == null) {
        console.log("message is null")
    }
    const modal = tableProps.canLease
    if (modal) {
        console.log("modal is true")
    }
    const [isModalOpen, setIsModalOpen] = useState(modal)
    useEffect(() => {
        console.log("tableProps.canLease changed:", modal);
        setIsModalOpen(modal);
    }, [modal]); // 依赖 modal (tableProps.canLease)

    useEffect(() => {
        if (isModalOpen) {
            const timer = setTimeout(() => {
                setIsModalOpen(false); // 自动关闭 Modal
            }, 5000);
            return () => clearTimeout(timer); // 清除定时器
        }
    }, [isModalOpen]); // 依赖 isModalOpen
    const handleLease = (leaseStatus: LeaseStatus) => {
        setIsModalOpen(false)
        message?.onNext(makeTaskPayload(makeMessage(props.displayUserCode, "1", makeLeaseTaskMessage(
            tableProps.table.tableId, leaseStatus, tableProps.leaseNumber, props.displayUserPosition, tableProps.taskId!)
        )))
    };
    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <span>点数:{props.randomNumber}</span>
                </div>
                <div>
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
                                        <Button key={item} onClick={() => handleLease(item)} type="primary"
                                                style={{marginLeft: '10px'}}>
                                            <span>{
                                                item === LeaseStatus.PUBLIC ? '报听' : item === LeaseStatus.PENG ? '碰' : item === LeaseStatus.HU ? '胡' : '杠'
                                            }</span>
                                        </Button>
                                    )
                                )
                            }
                            <Button key={LeaseStatus.NONE} onClick={() => handleLease(LeaseStatus.NONE)} type="primary"
                                    style={{marginLeft: '10px'}}>
                                            <span>{
                                                '不要'
                                            }</span>
                            </Button>
                        </div>
                    </Modal>
                </div>
            </div>
        </>
    )
}

export default TableCenter
