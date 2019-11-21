import React from 'react'
import Styles from './home.module.css'
import Nav from './Nav/Nav'
import Card from './Card/Card'
import { useFirebaseDatabaseValue, useFirebaseCurrentUser, useFirebaseDatabaseWriters } from 'fireact'
import { useEffect } from 'react'
 
function Dash() {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const userInfoList = useFirebaseDatabaseValue(`users/${uid}/MatchedPeople`) || {}
    const userInfo = Object.values(userInfoList)
    const cardCount = useFirebaseDatabaseValue(`users/${uid}/CurrentCard`) || 0
    const { update } = useFirebaseDatabaseWriters(`users/${uid}`)
    const [loaded, setLoaded] = React.useState(false)

    useEffect(() => { 
        setTimeout(() => setLoaded(true), 1000)
    })

    function reset() { 
        if(loaded) {
            update({['CurrentCard'] : 0})
            alert("You're too picky! Out of matches!")
        } else return null
    }

    function renderCard() {
        return ( 
            <Card
                yearsOfExperience={userInfo[cardCount] && userInfo[cardCount].yearsOfExperience} 
                language={userInfo[cardCount] && userInfo[cardCount].language}
                gender={userInfo[cardCount] && userInfo[cardCount].gender}>    
            </Card>
        )
    }

    return (
        <>
            <div className={Styles.mainContainer}>
                <div className={Styles.navContainer}>
                    <Nav currentPage='Home'/>
                </div>
                    <div className={Styles.cardContainer}>
                        {cardCount < userInfo.length ? renderCard()
                                                     : reset()
                                                        
                        }
                    </div>
            </div>
        </>
    )
}

export default Dash