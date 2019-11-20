import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Styles from './Form.module.css';
import { Input } from '@material-ui/core'
import Nav from './Nav/Nav'

import { useFirebaseDatabaseWriters, useFirebaseCurrentUser, useFirebaseDatabaseValue } from 'fireact'

function Questionnaire() { 
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null
    const name = useFirebaseDatabaseValue(`users/${uid}/profile/name`)

    const { update } = useFirebaseDatabaseWriters(`users/${uid}`)
    const currentUser = useFirebaseDatabaseValue(`users/${uid}/Profile`)
    const allUsersList = useFirebaseDatabaseValue(`users`) || {}
    const allOtherUsersList = Object.keys(allUsersList).filter(e => e != uid)
    const sAllOtherUsers = Object.keys(allUsersList)
                            .filter(key => allOtherUsersList.includes(key))
                            .reduce((obj, key) => {
                                obj[key] = allUsersList[key]
                                return obj
                            }, {})
    const sortedUsers = Object.values(sAllOtherUsers).map((e) => e.Profile)

    const [questionnaireInputs, setQuestionnaireInputs] = React.useState({
        firstname: '',
        surname: '',
        dateOfBirth: '',
        address: '',
        postcode: '',
        helpful: false,
        varietyPreferred: false,
        hardWorking: false,
        leader: false,
        similarPair: false,
        language: '',
        yearsOfExperience: '',
        lessExperiencePair: false,
        travelDistance: ''

    })

    const dummyAccount = {
        firstname: 'Syeda',
        surname: 'Sultana',
        dateOfBirth: '',
        gender:'',
        Address: '',
        postcode: 'IG11 8PZ',
        helpful: true,
        varietyPreferred: false,
        hardWorking: true,
        leader: false,
        similarPair: false,
        language: 'javascript',
        yearsOfExperience: '2to3',
        lessExperiencePair: false,
        travelDistance: '5to10'
    }

    const [funFactInput, setFunFactInputs] = React.useState(''); //temp: change to redux state

    const handleChangeIn = (propertyName, newValue) => {
        const callbackHandler = () => {
            const newState = {
                ...questionnaireInputs,
                [propertyName]: newValue
            }

            setQuestionnaireInputs(newState)
        }
        return callbackHandler
    }

    const handleTypedInput = (e, propertyName) => {
        const newState = {
            ...questionnaireInputs,
            [propertyName]: e.target.value
        }
        setQuestionnaireInputs(newState)
    }

    const handleSubmit = (event) => {
        console.log(questionnaireInputs.firstname);
        console.log(questionnaireInputs)
        console.log('firing')
        console.log(compareCodingPreferences(questionnaireInputs, dummyAccount))
        console.log(comparePersonality(questionnaireInputs, dummyAccount), 'pertsonality')
        update({'Profile' : questionnaireInputs})
        event.preventDefault()

    }

    const compareLogistics = (userLogistics, otherPersonLogistics) => {

    }

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
     
    console.log(uid)
    
    return (
        <>
        
        <form onSubmit={handleSubmit} className={Styles.mainContainer}>
            <div className={Styles.navContainer}>
                <Nav currentPage='profile'/>
            </div>
            <div className={Styles.personalInfoContainer}>
                    <h4 className={Styles.title1}>Personal Info</h4>
                    <label>
                        <Input
                        className={Styles.input}
                        placeholder='First Name'
                        onChange={(event) => {
                            handleTypedInput(event, 'firstname')
                        }}/>
                    </label>
                    <label>
                        <Input 
                        className={Styles.input}
                        placeholder='Last Name'
                        onChange={(event) => {
                            handleTypedInput(event, 'surname')
                        }}/>
                    </label>
                    <label>
                        <Input 
                        className={Styles.input}
                        placeholder='Address'
                        onChange={(event) => {
                            handleTypedInput(event, 'address')
                        }}/>
                    </label >
                    <label>
                        <Input 
                        className={Styles.input}
                        placeholder='Postcode'
                        onChange={(event) => {
                            handleTypedInput(event, 'postcode')
                        }}/>
                    </label>
                    <br />
                    <label className={Styles.question}>
                        Date of Birth:  
                        <input type="date" className={Styles.calendar} onChange={(event) => {
                            handleTypedInput(event, 'dateOfBirth')
                        }}/>
                    </label>
                        <form className={Styles.question}>
                            <label class="radio-inline">Select your gender:
                                <input className={Styles.space2}type="radio" name="gender" onChange={handleChangeIn('gender', "male")}/>   male
                            </label>
                            <label class="radio-inline">
                                <input className={Styles.space2} type="radio" name="gender" onChange={handleChangeIn('gender', 'female')}/>   female
                            </label>
                        </form>
                </div>
                
                
                <div className={Styles.personalityContainer}>
                <h4 className={Styles.title2}>Personality</h4>
                <form className={Styles.question2}>
                    <label class="radio-inline"> Do you love helping others?
                    <input className={Styles.space2} type="radio" align="right" name="helpAnswer" onChange={handleChangeIn('helpful', true)} /> yes
                    </label>
                    <label class="radio-inline">
                    <input className={Styles.space2} type="radio" align="right" name="helpAnswer" onChange={handleChangeIn('helpful', false)} /> no
                    </label>
                </form>
                <br/>
                <form className={Styles.question2}>
                    <label class="radio-inline"> Do you prefer variety to routine?
                    <input className={Styles.space2} type="radio" name="varietyPreferred" onChange={handleChangeIn('varietyPreferred', true)} /> yes
                    </label>
                    <label class="radio-inline">
                    <input className={Styles.space2} type="radio" name="varietyPreferred" onChange={handleChangeIn('varietyPreferred', false)} /> no
                    </label>
                </form>
                <br/>
                <form className={Styles.question2}>
                    <label class="radio-inline"> Are you hardworking?
                    <input className={Styles.space2} type="radio" name="hardworkingAnswer" onChange={handleChangeIn('hardWorking', true)} /> yes
                    </label>
                    <label>
                    <input className={Styles.space2} type="radio" name="hardworkingAnswer" onChange={handleChangeIn('hardWorking', false)} /> no
                    </label>
                </form >
                <br/>
                <form className={Styles.question2}>
                    <label class="radio-inline"> Would you see yourself as a leader?
                    <input className={Styles.space2} type="radio" name="leaderAnswer" onChange={handleChangeIn('leader', true)} /> yes
                    </label>
                    <label class="radio-inline">
                    <input className={Styles.space2} type="radio" name="leaderAnswer" onChange={handleChangeIn('leader', false)} /> no
                    </label>
                </form>
                <br/>
                <form className={Styles.question2}>
                    <label class="radio-inline"> Do you want to work with someone who is similar to you?
                    <input className={Styles.space2} type="radio" name="similarAnswer" onChange={handleChangeIn('similarPair', true)} /> yes
                    </label>
                    <label>
                    <input className={Styles.space2} type="radio" name="similarAnswer" onChange={handleChangeIn('similarPair', true)} /> no
                    </label>
                </form >
                <br/>
                <p className={Styles.question2}>A fun fact about you (will be displayed on your profile)</p>
                <br/>
                <textarea rows="2" cols="127" placeholder="e.g: I can lick my elbow" name="funFactInput"></textarea>
                </div>
        
                <div className={Styles.codingContainer}>  
                <h4 className={Styles.title3}>Coding Preferences</h4>
                
                <div className={Styles.question2Container}>
                <h1 className={Styles.question2}>Languages/frameworks preferred</h1>
                <br/>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="language" onChange={handleChangeIn('language', 'javascript')}/>JavaScript ~ React, Redux
                </label>
                <label className={Styles.container}>
                <input  className={Styles.space} type="radio" name="language" onChange={handleChangeIn('language', 'pythonweb')}/>Python ~ Django, Flask (web developement)
                </label>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="language" onChange={handleChangeIn('language', 'java')}/>Java
                </label>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="language" onChange={handleChangeIn('language', 'ruby')} />Ruby and Ruby on Rails
                </label>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="language" onChange={handleChangeIn('language', 'clanguage')} />The C Language
                </label>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="language" onChange={handleChangeIn('language', 'pythonml')} />Python ~ TensorFlow (machine learning)
                </label>
                </div>

                <br />
                <h1 className={Styles.question2}>Do you want to work with someone who has less experience than you?</h1>
                <br/>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="lessExperiencePair" onChange={handleChangeIn('lessExperiencePair', true)} /> yes
                </label>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="lessExperiencePair" onChange={handleChangeIn('lessExperiencePair', false)} /> no
                </label>

                <br/>
                <div className={Styles.question2Container2}>
                <h1 className={Styles.question2}>Years of coding experience</h1>
                <br/>
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '0to1')} />0 - 1
                </label>
                <label className={Styles.container}>
                <input className={Styles.space}  type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '2to3')} />2 - 3
                </label>
                <label className={Styles.container}>
                <input className={Styles.space}  type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '4to5')} />4 - 5
                </label >
                <label className={Styles.container}>
                <input className={Styles.space} type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '6')} />6 +
                </label>
                </div>
                <br/>
                <button className={Styles.button} type="submit" onClick={(e) => { 
                    handleSubmit(e)
                    }}>Submit all</button>
                </div>
                <br />
             </form>
         </>
    )
}







export default Questionnaire;