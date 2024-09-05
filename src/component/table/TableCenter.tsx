import {CenterProps} from "../../domain/Table.ts";
import Card from './Card.tsx'

function TableCenter({data}: { data: CenterProps }) {

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateAreas: `
        "topLeft top topRight"
        "left center right"
        "bottomLeft bottom bottomRight"
      `,
                width: '100%',
                height: '100%'
            }}>
                <div style={{gridArea: 'top'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '50%',
                        flex: '0 1 auto',
                        gap: '5px'
                    }}>
                        {
                            data.topList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={true} isLeft={false}/>
                            ))
                        }
                    </div>
                </div>
                <div style={{gridArea: 'left'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '50%',
                        flex: '0 1 auto',
                        gap: '5px'
                    }}>
                        {
                            data.leftList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={false} isLeft={true}/>
                            ))
                        }
                    </div>
                </div>
                <div style={{gridArea: 'center'}}>
                    {/* 中间的出牌区域 */}
                    <div style={{textAlign: 'center'}}>
                        <h3>{data.position === 'EAST' ? '东' : data.position === 'WEST' ? '西' : data.position === 'NORTH' ? '北' : '南'}</h3>
                        {
                            data.mahjong ? (
                                <Card value={data.mahjong.number} isHorizontal={true} isLeft={false}/>
                            ) : (
                                <></>
                            )
                        }
                    </div>
                </div>
                <div style={{
                    gridArea: 'right', display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column-reverse',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '50%',
                        maxHeight: '50%',
                        gap: '5px'
                    }}>
                        {
                            data.rightList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={false} isLeft={false}/>
                            ))
                        }
                    </div>
                </div>
                <div style={{gridArea: 'bottom'}}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row-reverse',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        maxWidth: '50%',
                        flex: '0 1 auto',
                        gap: '5px'
                    }}>
                        {
                            data.bottomList.map((item) => (
                                <Card key={item.order} value={item.number} isHorizontal={true} isLeft={false}/>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default TableCenter
