import React, { useEffect ,useState} from 'react'
import '../css/content.css'

function Content(props) {
    console.log(" state change"+props.sideBar)
    return (
        <div className={props.sideBar ? "openSideBarDiv" : "closeSideBarDiv"}>
            <h1 style={{textAlign:"left"}}>hiiiii</h1>
        </div>
    )
}

export default React.memo(Content)
