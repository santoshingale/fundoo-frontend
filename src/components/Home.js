import React, { useState, useEffect } from 'react'
import '../css/Home.css'
import AppBar from './AppBar'
import SideBar from './SideBar'
import Content from './Content'

function Home() {
    const[state,setState] = useState(false);

    const changeState =()=>{
        setState(previosState=>!previosState)
    }

    return (
        <div className="homeDiv">
            <AppBar  changeState={changeState}/>
            <SideBar sideBar={state}/>
            <Content sideBar={state}/>
        </div>
    )
}

export default Home
