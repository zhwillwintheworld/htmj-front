import {Button, Form, FormProps, Input} from "antd";
import {LoginRequest} from "../../domain/param/UserParam.ts";
import {API_LOGIN} from "../../config/RequestConfig.ts";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserChangeContext} from "../../config/UserContext.ts";

const onFinishFailed: FormProps<LoginRequest>['onFinishFailed'] = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

function Login() {
    const navigate = useNavigate();
    const userDispatch = useContext(UserChangeContext)!
    const onFinish: FormProps<LoginRequest>['onFinish'] = (values) => {
        values.platform = 'WEB'
        values.app = 'mahjong'
        API_LOGIN(values).then(res => {
            localStorage.setItem('token', res.token)
            localStorage.setItem("userCode", res.userCode)
            localStorage.setItem("userType", res.userType)
            userDispatch({
                type: 'SET', payload: {
                    token: res.token,
                    userCode: res.userCode,
                    userType: res.userType
                }
            })
            navigate("/")
        })
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
