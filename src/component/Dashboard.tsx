import React from 'react';

import {Button, Tabs, Typography} from 'antd';
import Play from "./play/Play.tsx";

const {Text} = Typography;


const OperationsSlot: Record<PositionType, React.ReactNode> = {
    left: <Text>会同麻将</Text>,
    right: <Button>Login</Button>,
};

const play: React.ReactNode = <Play/>;

const items = new Array(2)
items.push({
    label: `组队`,
    key: "room",
    children: play,
}, {
    label: `聊天`,
    key: "chat",
    children: `Content of tab 聊天`,
}, {
    label: `战绩`,
    key: "history",
    children: `Content of tab 战绩`,
})

function Dashboard() {


    return (
        <>
            <Tabs centered tabBarExtraContent={OperationsSlot} items={items}/>
        </>
    )
}

export default Dashboard
