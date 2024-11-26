import type {FormProps} from 'antd';
import {Button, Form, Input} from 'antd';
import {CreateRoomRequest} from "../../domain/param/RoomParam.ts";
import {API_CREATE_ROOM} from "../../config/RequestConfig.ts";
import {RoomMode, RoomPublic} from "../../domain/Response/RoomInfoResponse.ts";
import {Platform} from "../../domain/Common.ts";


function CreateRoom() {
    const onFinish: FormProps<CreateRoomRequest>['onFinish'] = (values) => {
    values.roomConfig = {
        bigBigWinConfig: true,
        canFireWinner: true,
        canPublic: true,
        completeWinnerConfig: true,
        fireWinnerConfig: 1,
        limit: 4,
        password: values.password,
        isPublic: values.isPublic ? RoomPublic.PUBLIC : RoomPublic.PRIVATE
    }
    values.roomMode = RoomMode.GAME
    values.platform = Platform.WEB
    values.app = 'mahjong'
    API_CREATE_ROOM(values).then(r => {
        console.log(r);
    })
};

const onFinishFailed: FormProps<CreateRoomRequest>['onFinishFailed'] = (errorInfo) => {
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
                    <Form.Item<CreateRoomRequest>
                        label="房间名"
                        name="roomName"
                        rules={[{required: true, message: '房间名不能为空!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<CreateRoomRequest>
                        label="密码"
                        name="password"
                        rules={[{required: true, message: '密码不能为空!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>

                    <Form.Item<CreateRoomRequest>
                        label="是否公开"
                        name="isPublic"
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            创建房间
                        </Button>
                    </Form.Item>
                </Form>

            </div>

        </>
    )
}

export default CreateRoom
