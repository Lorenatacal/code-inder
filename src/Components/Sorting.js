import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'

const compareCodingPreferences = (user, otherPerson) => {
    if (user.language === otherPerson.language && user.yearsOfExperience === otherPerson.yearsOfExperience) {
        return true
    } else if (user.language === otherPerson.language && user.lessExperiencePair) {
        return true
    } else {
        return false
    }
}

const comparePersonality = (user, otherPerson) => {
    if (user.similarPair) {
        if(user.helpful === otherPerson.helpful && 
            user.varietyPreferred === otherPerson.varietyPreferred && 
            user.hardWorking === otherPerson.hardWorking && 
            user.leader !== otherPerson.leader) {
                return true
        } else {
            if (user.helpful !== otherPerson.helpful && 
                user.varietyPreferred !== otherPerson.varietyPreferred && 
                user.hardWorking !== otherPerson.hardWorking && 
                user.leader !== otherPerson.leader) {
                    return true
            } else if (user.helpful !== otherPerson.helpful ||
                user.varietyPreferred !== otherPerson.varietyPreferred ||
                user.hardWorking !== otherPerson.hardWorking && 
                user.leader !== otherPerson.leader) {
                    return true
            } else if (user.helpful !== otherPerson.helpful &&
                user.varietyPreferred !== otherPerson.varietyPreferred ||
                user.hardWorking !== otherPerson.hardWorking && 
                user.leader !== otherPerson.leader) {
                    return true
            } else {
                return false
            }
        }
    } 
}

    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const allOtherUsers = useFirebaseDatabaseValue(`users/${uid}/SortedUsers`)
    const currentUser = useFirebaseDatabaseValue(`users/${uid}/Profile`)
    const { update } = useFirebaseDatabaseWriters(`users/${uid}/MatchedPeople`)
    console.log(uid)
    console.log(currentUser)

    //const [pressedMatch, setPressedMatch] = React.useState(false)
    const dispatch = useDispatch()
    let count = 0

    

   
    // if (pressedMatch) {
    //     //card
    // } 
    
    // return (
    //     <div>
    //         <h1>hello</h1>
    //         <button onClick={() => {
    //             console.log(currentUser, 'currentUser')
    //             comparePerson(currentUser, allOtherUsers);
    //             //setPressedMatch(true)
    //         }}>Match</button>
    //     </div>
    // )


const handleComparison = (user, otherPerson) => {
    if (compareCodingPreferences(user, otherPerson) && comparePersonality(user, otherPerson)) {
            update({[count] : otherPerson})
            count++
            // dispatch({ type: "ADD_TO_MATCHED_PEOPLE", payload: otherPerson})
            console.log('person matched')
    } else {
        console.log('person not matched')
    }
}

export const comparePerson = (user, otherPeople) => {
    //console.log(otherPeople, 'otherPeople'
    otherPeople.filter(otherPerson => handleComparison(user, otherPerson))
}