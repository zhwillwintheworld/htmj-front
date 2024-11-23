import {useContext} from "react";
import {RoomContext} from "../../config/RoomContext.ts";
import TableSeat from "./TableSeat.tsx";
import {Position} from "../../domain/Task.ts";

function RoomContent() {
    const room = useContext(RoomContext)


    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateAreas: `
        "left top right"
        "left center right"
        "left bottom right"
      `,
                backgroundColor: '#004d4c',
                gap: '10px',
                width: '98vw',
                height: '98vh'
            }}>
                <div style={{
                    gridArea: 'top', height: '30vh', justifyContent: 'center',
                    alignItems: 'center', display: 'flex',
                }}>
                    <TableSeat props={{position: Position.NORTH, player: room!.roomTable!.north}}/>
                </div>
                <div style={{
                    gridArea: 'left', display: 'flex',
                    width: '30vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TableSeat props={{position: Position.WEST, player: room!.roomTable!.west}}/>
                </div>
                <div style={{gridArea: 'center', width: '40vw', height: '40vh'}}>

                </div>
                <div style={{
                    gridArea: 'right', display: 'flex',
                    width: '30vw',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <TableSeat props={{position: Position.EAST, player: room!.roomTable!.east}}/>
                </div>
                <div style={{gridArea: 'bottom', height: '30vh'}}>
                    <TableSeat props={{position: Position.SOUTH, player: room!.roomTable!.south}}/>
                </div>
            </div>
        </>
    )
}

export default RoomContent
