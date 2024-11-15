import React from 'react';

import {Button, Tabs, Typography} from 'antd';
import Play from "./play/Play.tsx";
import UserForm from "./user/UserForm.tsx";
import {To, useLocation, useNavigate} from "react-router-dom";

const {Text} = Typography;
type PositionType = 'left' | 'right';

const items = [
    {
        key: 'room',
        label: '组队',
        children: <Play/>,
    },
    {
        key: 'chat',
        label: '聊天',
        children: <div>聊天</div>,
    },
    {
        key: 'history',
        label: '战绩',
        children: <div>战绩</div>,
    },
    {
        key: 'user',
        label: '',
        children: <UserForm/>,
    },
]

function Dashboard() {
    const token = localStorage.getItem("token")
    const defaultActiveKey = token != null && token != '' ? "room" : "user"
    const OperationsSlot: Record<PositionType, React.ReactNode> = {
        left: <Text>会同麻将</Text>,
        right: <Button onClick={() => navigate('/user')}>Login</Button>,
    };
    const navigate = useNavigate();
    const location = useLocation();

    // 根据当前路径设置活动标签
    const getActiveKey = () => {
        if (location.pathname.startsWith('/room')) {
            return '/room';
        } else if (location.pathname.startsWith('/chat')) {
            return '/chat';
        } else if (location.pathname.startsWith('/history')) {
            return '/history';
        }
        return '/user'; // 默认选中Overview
    };

    const handleTabChange = (key: To) => {
        navigate(key);
    };
    return (
        <>
            <Tabs centered tabBarExtraContent={OperationsSlot} defaultActiveKey={defaultActiveKey}
                  onChange={handleTabChange}
                  activeKey={getActiveKey()} items={items}>
            </Tabs>
        </>
    )
}

export default Dashboard
