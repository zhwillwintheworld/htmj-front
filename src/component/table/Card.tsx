import {Button} from "antd";
import yiwan from '../../assets/0101.svg'
import erwan from '../../assets/0102.svg'
import sanwan from '../../assets/0103.svg'
import siwan from '../../assets/0104.svg'
import wuwan from '../../assets/0105.svg'
import liuwan from '../../assets/0106.svg'
import qiwan from '../../assets/0107.svg'
import bawan from '../../assets/0108.svg'
import jiuwan from '../../assets/0109.svg'
import yitiao from '../../assets/0301.svg'
import ertiao from '../../assets/0302.svg'
import santiao from '../../assets/0303.svg'
import sitian from '../../assets/0304.svg'
import wutiao from '../../assets/0305.svg'
import liutiao from '../../assets/0306.svg'
import qitiao from '../../assets/0307.svg'
import batiao from '../../assets/0308.svg'
import jiutiao from '../../assets/0309.svg'
import yitong from '../../assets/0201.svg'
import ertong from '../../assets/0202.svg'
import santong from '../../assets/0203.svg'
import sitong from '../../assets/0204.svg'
import wutong from '../../assets/0205.svg'
import liutong from '../../assets/0206.svg'
import qitong from '../../assets/0207.svg'
import batong from '../../assets/0208.svg'
import jiutong from '../../assets/0209.svg'
import back from '../../assets/MJback.svg'

type CardProps = {
    value: number; // 牌的显示内容
    isHorizontal: boolean; // 是否水平排列
    isLeft: boolean;
    isSelected: boolean; // 判断当前 card 是否被选中
    onSelect: () => void; // 处理点击事件
    onConfirm: () => void; // 当再次点击被选中的按钮时执行的逻辑
};

const getImg = (value: number) => {
    switch (value) {
        case 0:
            return back
        case 1:
            return yiwan
        case 2:
            return erwan
        case 3:
            return sanwan
        case 4:
            return siwan
        case 5:
            return wuwan
        case 6:
            return liuwan
        case 7:
            return qiwan
        case 8:
            return bawan
        case 9:
            return jiuwan
        case 11:
            return yitiao
        case 12:
            return ertiao
        case 13:
            return santiao
        case 14:
            return sitian
        case 15:
            return wutiao
        case 16:
            return liutiao
        case 17:
            return qitiao
        case 18:
            return batiao
        case 19:
            return jiutiao
        case 21:
            return yitong
        case 22:
            return ertong
        case 23:
            return santong
        case 24:
            return sitong
        case 25:
            return wutong
        case 26:
            return liutong
        case 27:
            return qitong
        case 28:
            return batong
        case 29:
            return jiutong
        default:
            return back
    }
}

function Card({value, isHorizontal, isLeft, isSelected, onSelect, onConfirm}: CardProps) {
    const handleClick = () => {
        if (isSelected) {
            onConfirm(); // 如果当前 card 已被选中，执行确认操作
        } else {
            onSelect(); // 否则标记为选中
        }
    };
    const rotate = !isHorizontal && isLeft ? 'rotate(90deg)' : !isHorizontal && !isLeft ? 'rotate(-90deg)' : 'rotate(0deg)'
    return (
        <>
            <div style={
                {
                    width: isHorizontal ? '35x' : '50px',
                    height: isHorizontal ? '50px' : '35px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: 'width 0.5s, height 0.5s',
                    margin: '2px'
                }
            }>
                <div style={{
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Button
                        style={{
                            padding: '0',
                            width: '100%',
                            height: '100%',
                            transformOrigin: 'center',
                            transform: isSelected?'translateY(-20px)':'translateY(0)'
                        }}
                        onClick={handleClick}
                    >
                        <img src={getImg(value)} style={{
                            width: '30px',
                            height: '42px',
                            transform: rotate
                        }} alt={"牌"}/>

                    </Button>
                </div>
            </div>
        </>
    )
}

export default Card
