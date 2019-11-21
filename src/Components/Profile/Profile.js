import React from 'react'
import Questionnaire from '../Questionnaire'
import Styles from './profile.module.css'
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'
import ReactCardFlip from 'react-card-flip'
import Nav from '../Nav/Nav'
import { comparePerson } from '../Sorting'

function Profile(params) {
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const currentUser = useFirebaseDatabaseValue(`users/${uid}/Profile`)
    const [profileComplete, setProfileComplete] = React.useState(false)
    const { update: updateMatchedPeople } = useFirebaseDatabaseWriters(`users/${uid}/MatchedPeople`)
    const sortedUsersList = useFirebaseDatabaseValue(`users/${uid}/SortedUsers`) || {}
    const sortedUsers = Object.values(sortedUsersList)
    const matched = useFirebaseDatabaseValue(`users/${uid}/MatchedPeople`)

     function matcher() {
        let matched = comparePerson(currentUser, sortedUsers)
        console.log(matched)
        matched.forEach((user, index) => {
            updateMatchedPeople({[index] : user})
        })    
    }   

    React.useEffect(() => {
       console.log(currentUser, 'currentUser') 
       if (currentUser) {
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
        !matched && matcher() 
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

