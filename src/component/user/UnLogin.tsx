import {Button} from "antd";
import {useNavigate} from "react-router-dom";

function UnLogin() {
    const navigate = useNavigate();
    return (
        <>
            <div style={{
                width: '100%',
                height: '80vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <div>
                    <span>未登录，前先登录</span>
                </div>
                <Button onClick={() => navigate('/login')}>登录</Button>
            </div>
        </>
    )
}

export default UnLogin
