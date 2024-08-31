import { useState } from 'react'
import Room from "./Room.tsx"
import EnterRoom from "./EnterRoom.tsx";
function Play() {
    const [isVisible] = useState(true);

    return (
        <>
            <div>
                {isVisible? <Room/> : <EnterRoom/>}
            </div>
        </>
    )
}

export default Play
