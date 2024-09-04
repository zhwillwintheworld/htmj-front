import './tableTest.css'
import UserSeat from "./UserSeat.tsx";

function App() {
    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateAreas: `
        "top top top"
        "left center right"
        "bottom bottom bottom"
      `,
                backgroundColor: '#004d40',
                gap: '10px',
                width: '99vw',
                height: '100vh'
            }}>
                <div style={{gridArea: 'top'}}>
                    <UserSeat position="top"/>
                </div>
                <div style={{gridArea: 'left'}}>
                    <UserSeat position="left"/>
                </div>
                <div style={{gridArea: 'center'}}>
                    {/* 中间的出牌区域 */}
                    <div style={{textAlign: 'center'}}>
                        <h3>出牌区域</h3>
                        {/* 出牌显示 */}
                    </div>
                </div>
                <div style={{gridArea: 'right'}}>
                    <UserSeat position="right"/>
                </div>
                <div style={{gridArea: 'bottom'}}>
                    <UserSeat position="bottom"/>
                </div>
            </div>

        </>
    )
}

export default App
