import type {FormProps} from 'antd';
import {Button, Form, Input} from 'antd';
import {EnterRoomRequest} from "../../domain/param/RoomParam.ts";
import {useContext} from "react";
import {UserContext} from "../../config/UserContext.ts";
import {API_ENTER_ROOM} from "../../config/RequestConfig.ts";


function JoinRoom() {
    const user = useContext(UserContext)
    const onFinish: FormProps<EnterRoomRequest>['onFinish'] = (values) => {
        values.userCode = user!.userCode
        API_ENTER_ROOM(values).then(r => {
            console.log("加入房间",r)
        })
    };

    const onFinishFailed: FormProps<EnterRoomRequest>['onFinishFailed'] = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (
        <>
            <div style={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <Form
                    name="basic"
                    labelCol={{span: 8}}
                    wrapperCol={{span: 16}}
                    style={{maxWidth: 600}}
                    initialValues={{remember: true}}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<EnterRoomRequest>
                        label="房间id"
                        name="roomId"
                        rules={[{required: true, message: '请输入房间id!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<EnterRoomRequest>
                        label="密码"
                        name="password"
                        rules={[{required: true, message: '密码不能为空!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>
                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            进入房间
                        </Button>
                    </Form.Item>
                </Form>

            </div>

        </>
    )
}

export default JoinRoom
