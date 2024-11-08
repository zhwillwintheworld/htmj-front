import React from 'react';

import {Tabs} from 'antd';
import Login from "./Login.tsx";
import Register from "./Register.tsx";


const login: React.ReactNode = <Login/>;
const register: React.ReactNode = <Register/>;

const items = new Array(2)
items.push({
    label: `登录`,
    key: "login",
    children: login,
},  {
    label: `注册`,
    key: "register",
    children: register,
})

function UserForm() {


    return (
        <>
            <Tabs centered  items={items}/>
        </>
    )
}

export default UserForm
