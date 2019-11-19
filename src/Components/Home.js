import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Styles from './home.module.css'
import { logoutUser } from '../Redux/Actions/auth'
import { useDispatch } from 'react-redux'
import Nav from './Nav/Nav'
import Questionnaire from './Questionnaire'

function Home() { 

    const dispatch = useDispatch()

    return (
         <div className={Styles.mainContainer}>
             {/* <div className={Styles.navContainer}>
                <Nav currentPage='Home'/>
                </div>
                <div className={Styles.cardContainer}>
                
            </div> */}
             <Questionnaire />
            <button onClick={() => dispatch(logoutUser())}>logouts</button>
        </div>
    )
}

export default Home