type CardProps = {
    value: string; // 牌的显示内容
    isHorizontal: boolean; // 是否水平排列
};
function Card({value, isHorizontal}: CardProps) {
    return (
        <>
            <div style={{
                width: isHorizontal ? '30px' : '60px',
                height: isHorizontal ? '60px' : '30px',
                lineHeight: '60px',
                textAlign: 'center',
                border: '1px solid black',
            }}>
                {value}
            </div>
        </>
    )
}

export default Card
