import React from 'react';
import './Questionnaire.css';
import { Switch, Route } from 'react-router-dom'

import { useFirebaseDatabaseWriters, useFirebaseCurrentUser } from 'fireact'

function Questionnaire() { 
    const user = useFirebaseCurrentUser()
    const uid = user ? user.uid : null

    const { update } = useFirebaseDatabaseWriters(`users/${uid}`)

    const [questionnaireInputs, setQuestionnaireInputs] = React.useState({
        firstname: '',
        surname: '',
        dateOfBirth: '',
        Address: {
            AddressLine1: '',
            AddressLine2: ''
        },
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
        Address: {
            AddressLine1: '',
            AddressLine2: ''
        },
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
        console.log(compareCodingPreferences(questionnaireInputs, dummyAccount))
        console.log(comparePersonality(questionnaireInputs, dummyAccount), 'pertsonality')
        update({'Profile' : questionnaireInputs})
        event.preventDefault();
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
     

    return (

        <>
             <form className="questionnaire" onSubmit={handleSubmit}>
                <h4 className="title">Personal Info</h4>
                <label className="formName">
                    Firstname: 
                    <input className="formInput" onChange={(event) => {
                        handleTypedInput(event, 'firstname')
                    }}></input>
                </label>
                <label className="formName">
                    Surname: 
                    <input className="formInput" onChange={(event) => {
                        handleTypedInput(event, 'surname')
                    }}></input>
                </label>
                <br />
                <label className="formName">
                    Date of Birth: 
                    <input type="date" className="formInput" onChange={(event) => {
                        handleTypedInput(event, 'dateOfBirth')
                    }}></input>
                </label>
                <br />
                <label className="formName">
                    Address Line 1: 
                    <input className="formInput" onChange={(event) => {
                        handleTypedInput(event, 'Address.AddressLine1')
                    }}></input>
                </label >
                <label className="formName">
                    Address Line 2: 
                    <input className="formInput" onChange={(event) => {
                        handleTypedInput(event, 'Address.AddressLine2')
                    }}></input>
                </label>
                <br />
                <label className="formName">
                    Post Code: 
                    <input className="formInput" onChange={(event) => {
                        handleTypedInput(event, 'postcode')
                    }}></input>
                </label>
                <br />
                <div className="grid">
                <h4 className="title">Personality</h4>
                <label className="questions">
                    Do you love helping others? 
                    <p className="questions"> yes </p>
                    <input type="radio" name="helpAnswer" onChange={handleChangeIn('helpful', true)} />
                    <p className="questions"> no </p>
                    <input type="radio" name="helpAnswer" onChange={handleChangeIn('helpful', false)} />
                </label>
                    <br />
                <label className="questions">
                    Do you prefer variety to routine?
                    <p className="questions">yes</p>
                    <input type="radio" name="varietyPreferred" onChange={handleChangeIn('varietyPreferred', true)} />
                    <p className="questions">no</p>
                    <input type="radio" name="varietyPreferred" onChange={handleChangeIn('varietyPreferred', false)} />
                </label>
                <br />
                <label className="questions">
                    Are you hardworking?
                    <p className="questions">yes</p>
                    <input type="radio" name="hardworkingAnswer" onChange={handleChangeIn('hardWorking', true)} />
                    <p className="questions">no</p>
                    <input type="radio" name="hardworkingAnswer" onChange={handleChangeIn('hardWorking', false)} />
                </label>
                <br />
                
                <label className="questions">
                    Would you see yourself as a leader?
                    <p className="questions">yes</p>
                    <input type="radio" name="leaderAnswer" onChange={handleChangeIn('leader', true)} />
                    <p className="questions">no</p>
                    <input type="radio" name="leaderAnswer" onChange={handleChangeIn('leader', false)} />
                </label>
                <br />
                <label className="questions">
                    Do you want to work with someone who is similar to you or someone who will complement your strengths?
                    <p className="questions">yes</p>
                    <input type="radio" name="similarAnswer" onChange={handleChangeIn('similarPair', true)} />
                    <p className="questions">no</p>
                    <input type="radio" name="similarAnswer" onChange={handleChangeIn('similarPair', true)} />
                </label>
                <br /> 
                <p className="questions" >A fun fact about you (will be displayed on your profile)</p>
                <br />
                <textarea className="textarea" placeholder="e.g: I love cats" name="funFactInput"></textarea>
                </div>
                <br />

                <div className="gridRight">
                <h4 className="title">Coding Preferences</h4>
                <br />

                 <label className="questions">
                    <p className="preferenceQuestions">Languages/frameworks preferred</p>
                    <br />
                    <p className="preference">JavaScript ~ React, Redux</p>
                    <input className="preference" type="radio" name="language" onChange={handleChangeIn('language', 'javascript')} />
                    <p className="preference">Python ~ Django, Flask (web developement)</p>
                    <input className="preference" type="radio" name="language" onChange={handleChangeIn('language', 'pythonweb')} />
                    <p className="preference">Java</p>
                    <input className="preference" type="radio" name="language" onChange={handleChangeIn('language', 'java')} />
                    <p className="preference">Ruby and Ruby on Rails</p>
                    <input className="preference" type="radio" name="language" onChange={handleChangeIn('language', 'ruby')} />
                    <p className="preference">The C Language </p>
                    <input className="preference" type="radio" name="language" onChange={handleChangeIn('language', 'clanguage')} />
                    <p className="preference">Python ~ TensorFlow (machine learning) </p>
                    <input className="preference" type="radio" name="language" onChange={handleChangeIn('language', 'pythonml')} />
                </label>
                <br />

                <label className="questions">
                    <p className="preferenceQuestions">Years of coding experience</p>
                    <br />
                    <p className="preference">0 - 1 </p>
                    <input className="preference" type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '0to1')} />
                    <p className="preference">2 - 3 </p>
                    <input className="preference" type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '2to3')} />
                    <p className="preference">4 - 5</p>
                    <input className="preference" type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '4to5')} />
                    <p className="preference">6 or over</p>
                    <input className="preference" type="radio" name="yearsOfExperience" onChange={handleChangeIn('yearsOfExperience', '6')} />
                </label>
                <br />

                <label className="questions">
                    <p className="preferenceQuestions">Do you want to work with someone who has less experience than you?</p>
                    <br />
                    <p className="questions">yes</p>
                    <input className="questions" type="radio" name="lessExperiencePair" onChange={handleChangeIn('lessExperiencePair', true)} />
                    <p className="questions">no</p>
                    <input className="questions" type="radio" name="lessExperiencePair" onChange={handleChangeIn('lessExperiencePair', false)} />
                </label>
                </div>

                <div className="gridLogistic">
                    <h4 className="title">Logistics</h4>
                    <label>
                        <p className="preferenceQuestions">How far are you willing to travel (miles)?</p>
                        <br />
                        <p className="preference"> 0 - 5 </p>
                        <input className="preference" type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '0to5')} />
                        <p className="preference"> 5 - 10 </p>
                        <input className="preference" type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '5to10')} />
                        <p className="preference"> 10 - 15 </p>
                        <input className="preference" type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '10to15')} />
                        <p className="preference"> 15 - 20 </p>
                        <input className="preference" type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '15to20')} />
                    </label>
                <br />
                </div>
                <br />
                <input className="button" type="submit" value="Finish" />
             </form>
         </>
    )
}

export default Questionnaire;