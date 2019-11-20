import React from 'react'
import Styles from './home.module.css'
import Nav from './Nav/Nav'
import Card from './Card/Card'


function Dash() {
    return (
        <>
            <div className={Styles.mainContainer}>
                <div className={Styles.navContainer}>
                    <Nav currentPage='Home'/>
                </div>
                <div className={Styles.cardContainer}>
                    <Card></Card>
                </div>
            </div>
        </>
    )
}

export default Dash