import React from 'react';

import {Tabs} from 'antd'
import CreateRoom from "./CreateRoom.tsx"
import JoinRoom from "./JoinRoom.tsx"

const createRoom : React.ReactNode = <CreateRoom/>;
const joinRoom : React.ReactNode = <JoinRoom/>;

const items = new Array(2)
items.push({
    label: `创建房间`,
    key: "createRoom",
    children: createRoom,
}, {
    label: `加入房间`,
    key: "joinRoom",
    children: joinRoom,
})

function EnterRoom() {


    return (
        <>
            <div>
                <Tabs centered items={items}/>
            </div>

        </>
    )
}

export default EnterRoom
