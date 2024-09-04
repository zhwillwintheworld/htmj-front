import {Button} from "antd";

type CardProps = {
    value: string; // 牌的显示内容
    isHorizontal: boolean; // 是否水平排列
};

function Card({value, isHorizontal}: CardProps) {
    return (
        <>
            <div style={
                {
                    width: isHorizontal ? '45x' : '90px',
                    height: isHorizontal ? '90px' : '45px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.5s, height 0.5s',
                    transformOrigin: 'center'
                }
            }>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transformOrigin: 'center'
                }}>
                    <Button
                        style={{
                            width: '100%',
                            height: '100%',
                    transformOrigin: 'center'
                        }}
                        onMouseEnter={() => console.log('Hovering!')}
                    >
                        <span style={{ display: 'inline-block', transform: isHorizontal? 'rotate(0deg)' : 'rotate(90deg)', fontSize: '24px' }}>
                        {value}
                            </span>
                    </Button>
                </div>
            </div>
        </>
    )
}

export default Card
