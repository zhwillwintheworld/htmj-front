import {CenterProps} from "../../domain/Table.ts";

function TableCenter({props}: { props: CenterProps }) {

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                <div>
                    <span>点数:{props.randomNumber}</span>
                </div>
            </div>
        </>
    )
}

export default TableCenter
