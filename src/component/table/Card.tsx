import {Button} from "antd";
import yiwan from '../../assets/0101一萬.svg'
import erwan from '../../assets/0102二萬.svg'
import sanwan from '../../assets/0103三萬.svg'
import siwan from '../../assets/0104四萬.svg'
import wuwan from '../../assets/0105萬.svg'
import liuwan from '../../assets/0106六萬.svg'
import qiwan from '../../assets/0107七萬.svg'
import bawan from '../../assets/0108八萬.svg'
import jiuwan from '../../assets/0109九萬.svg'
import yitiao from '../../assets/0301一條.svg'
import ertiao from '../../assets/0302二條.svg'
import santiao from '../../assets/0303三條.svg'
import sitian from '../../assets/0304四條.svg'
import wutiao from '../../assets/0305五條.svg'
import liutiao from '../../assets/0306六條.svg'
import qitiao from '../../assets/0307七條.svg'
import batiao from '../../assets/0308八條.svg'
import jiutiao from '../../assets/0309九條.svg'
import yitong from '../../assets/0201一餅.svg'
import ertong from '../../assets/0202二餅.svg'
import santong from '../../assets/0203三餅.svg'
import sitong from '../../assets/0204四餅.svg'
import wutong from '../../assets/0205五餅.svg'
import liutong from '../../assets/0206六餅.svg'
import qitong from '../../assets/0207七餅.svg'
import batong from '../../assets/0208八餅.svg'
import jiutong from '../../assets/0209九餅.svg'


type CardProps = {
    value: number; // 牌的显示内容
    isHorizontal: boolean; // 是否水平排列
    isLeft: boolean;
};

const getImg = (value: number) => {
    switch (value) {
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
            return yiwan
    }
}

function Card({value, isHorizontal,isLeft}: CardProps) {
    const rotate = !isHorizontal && isLeft? 'rotate(90deg)' : !isHorizontal && !isLeft? 'rotate(-90deg)' : 'rotate(0deg)'
    return (
        <>
            <div style={
                {
                    width: isHorizontal ? '45x' : '70px',
                    height: isHorizontal ? '70px' : '45px',
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
                    transformOrigin: 'center',
                }}>
                    <Button
                        style={{
                            width: '100%',
                            height: '100%',
                            transformOrigin: 'center'
                        }}
                        onMouseEnter={() => console.log('Hovering!')}
                    >
                        <img src={getImg(value)} style={{
                            width: '42px',
                            height: '60px',
                            transform: rotate
                        }} alt={"牌"}/>

                    </Button>
                </div>
            </div>
        </>
    )
}

export default Card
