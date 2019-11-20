import React from 'react'
import Styles from './home.module.css'
import Nav from './Nav/Nav'
import Card from './Card/Card'
import { useFirebaseDatabaseValue, useFirebaseCurrentUser } from 'fireact'
 
function Dash() {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const userInfoList = useFirebaseDatabaseValue(`users/${uid}/MatchedPeople`) || {}
    const userInfo = Object.values(userInfoList)
    const cardCount = useFirebaseDatabaseValue(`users/${uid}/CurrentCard`) || 0
    return (
        <>
            <div className={Styles.mainContainer}>
                <div className={Styles.navContainer}>
                    <Nav currentPage='Home'/>
                </div>
                <div className={Styles.cardContainer}>
                    <Card
                        yearsOfExperience={userInfo[cardCount] && userInfo[cardCount].yearsOfExperience} 
                        language={userInfo[cardCount] && userInfo[cardCount].language}>    
                    </Card>
                </div>
            </div>
        </>
    )
}

export default Dash