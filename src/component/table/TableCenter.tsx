import {CenterProps} from "../../domain/Table.ts";

function TableCenter({props}: { props: CenterProps }) {

    return (
        <>
            <div style={{display: 'flex',justifyContent:'center',alignItems:'center'}}>

                <span>点数:{props.randomNumber}</span>
                <span>当前人:{props.position}</span>

            </div>


        </>
    )
}

export default TableCenter
