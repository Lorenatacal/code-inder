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
                    <h1 className={Styles.title}>Personal information</h1>
                    <h2 className={Styles.header}>Name: {currentUser.firstname} {currentUser.surname} </h2>
                    <h3 className={Styles.text}>Date of birth: {currentUser.dateOfBirth}</h3>
                    <h3 className={Styles.text}>Address: {currentUser.address}</h3>
                    <h3 className={Styles.text}>Postcode: {currentUser.postcode}</h3>
                    <h3 className={Styles.text}>Favourite language: {currentUser.language}</h3>
                    <h3 className={Styles.text}>{currentUser.yearsOfExperience} years of experience</h3>
                    <h3 className={Styles.text}>Fun fact: {currentUser.funFact}</h3>
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

