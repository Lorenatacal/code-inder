import React from 'react'
import Questionnaire from '../Questionnaire'
import Styles from './profile.module.css'
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import ReactCardFlip from 'react-card-flip'
import Nav from '../Nav/Nav'


function Profile(params) {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentUser = useFirebaseDatabaseValue(`users/${uid}/Profile`)
    const [profileComplete, setProfileComplete] = React.useState(false)

    React.useEffect(() => {
       console.log(currentUser, 'currentUser') 
       if (currentUser) {
           //check if string properties are not equal to string
           if (
                currentUser.firstname !== '' &&
                currentUser.surname !== '' &&
                currentUser.dateOfBirth !== '' &&
                currentUser.address !== '' &&
                currentUser.postcode !== '' &&
                currentUser.language !== '' &&
                currentUser.yearsOfExperience !== '' 
           ) {
               setProfileComplete(true)
           } 
       }
    }, [currentUser])

    

    if (profileComplete) {
        return (
            <div className={Styles.mainContainer}>
                <Nav className={Styles.navContainer} currentPage='Profile'/>
                <div className={Styles.cardContainer}>
                    <h3>Your Profile:</h3>
                    <p>firstname: {currentUser.firstname}</p>
                    <p>surname: {currentUser.surname}</p>
                    <p>date of Birth: {currentUser.dateOfBirth}</p>
                    <p>Address: {currentUser.address}</p>
                    <p>postcode: {currentUser.postcode}</p>
                    <p>language: {currentUser.language}</p>
                    <p>years of experience: {currentUser.yearsOfExperience}</p>
                    <p>fun fact: {currentUser.funFact}</p>
                    {/* <p>firstname: {currentUser.firstname}</p>
                    <p>firstname: {currentUser.firstname}</p> */}
                </div>
            </div>
        )
    } else {
        return (
            <Questionnaire/>
        )
    }
    
}

export default Profile

