import {Button, Form, FormProps, Input} from "antd";
import {LoginRequest} from "../../domain/param/UserParam.ts";

const onFinish: FormProps<LoginRequest>['onFinish'] = (values) => {
    console.log('Success:', values);
};

const onFinishFailed: FormProps<LoginRequest>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login() {
    return (
        <>
            <div style={{
                width : '100%',
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
                    <Form.Item<LoginRequest>
                        label="用户名"
                        name="username"
                        rules={[{required: true, message: '用户名不能为空!'}]}
                    >
                        <Input/>
                    </Form.Item>

                    <Form.Item<LoginRequest>
                        label="密码"
                        name="password"
                        rules={[{required: true, message: '密码不能为空!'}]}
                    >
                        <Input.Password/>
                    </Form.Item>


                    <Form.Item wrapperCol={{offset: 8, span: 16}}>
                        <Button type="primary" htmlType="submit">
                            提交
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    )
}

export default Login
