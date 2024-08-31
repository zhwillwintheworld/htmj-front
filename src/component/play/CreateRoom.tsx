
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';

type FieldType = {
    roomName?: string;
    password?: string;
    isOpen?: string;
};

const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function CreateRoom() {


    return (
        <>
            <div>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item<FieldType>
                        label= "房间名"
                        name="roomName"
                        rules={[{ required: true, message: '房间名不能为空!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="密码"
                        name="password"
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="是否公开"
                        name="isOpen"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
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
