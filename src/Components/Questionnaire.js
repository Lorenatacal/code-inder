import React from 'react'
import { Switch, Route } from 'react-router-dom'

function Questionnaire() { 
    const [questionnaireInputs, setQuestionnaireInputs] = React.useState({
        firstname: '',
        surname:'',
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

    const handleChangeIn = (propertyName, newValue) => {
        const callbackHandler = (e) => {
            const newState = {
                ...questionnaireInputs,
                [propertyName]: newValue
            }

            setQuestionnaireInputs(newState)
        }
        return callbackHandler
    }

    handleChangeIn('helpful', true)
     

    return (

        <>
             <form>
                <h4>Personal Info</h4>
                <label>
                    Firstname
                    <input value={questionnaireInputs.firstname}></input>
                </label>
                <label>
                    Surname
                    <input value={questionnaireInputs.surname}></input>
                </label>
                <label>
                    Date of Birth
                    <input type="date" value={questionnaireInputs.dateOfBirth}></input>
                </label>
                
                <label>
                    Address Line 1
                    <input value={questionnaireInputs.Address.AddressLine1}></input>
                </label>
                
                <label>
                    Address Line 2
                    <input value={questionnaireInputs.Address.AddressLine2}></input>
                </label>
                
                <label>
                    Post Code
                    <input value={questionnaireInputs.postcode}></input>
                </label>
                
                <br />
                <h4>Personality</h4>
                <label>
                    Do you love helping others?
                    <br />
                    <p>yes</p>
                    <input type="radio" name="helpAnswer" onChange={handleChangeIn('helpful', true)} />
                    <p>no</p>
                    <input type="radio" name="helpAnswer" onChange={handleChangeIn('helpful', false)} />
                </label>
                
                <label>
                    Do you prefer variety to routine?
                    <br />
                    <p>yes</p>
                    <input type="radio" name="helpAnswer" onChange={handleChangeIn('varietyPreferred', true)} />
                    <p>no</p>
                    <input type="radio" name="helpAnswer" onChange={handleChangeIn('varietyPreferred', false)} />
                </label>
                
                <label>
                    Are you hardworking?
                    <br />
                    <p>yes</p>
                    <input type="radio" name="hardworkingAnswer" onChange={handleChangeIn('hardWorking', true)} />
                    <p>no</p>
                    <input type="radio" name="hardworkingAnswer" onChange={handleChangeIn('hardWorking', false)} />
                </label>
                
                
                <label>
                    Would you see yourself as a leader?
                    <br />
                    <p>yes</p>
                    <input type="radio" name="leaderAnswer" onChange={handleChangeIn('leader', true)} />
                    <p>no</p>
                    <input type="radio" name="leaderAnswer" onChange={handleChangeIn('leader', false)} />
                </label>
                
                <label>
                    Do you want to work with someone who is similar to you or someone who will complement your strengths?
                    <br />
                    <p>yes</p>
                    <input type="radio" name="similarAnswer" onChange={handleChangeIn('similarPair', true)} />
                    <p>no</p>
                    <input type="radio" name="similarAnswer" onChange={handleChangeIn('similarPair', true)} />
                </label>
                
                {/* <label>
                    A fun fact about you (will be displayed on your profile)
                    <input value="funFact"></input>
                    <h4>Coding Preferences</h4>
                    <br />
                </label> */}
                
                 <label>
                    Languages/frameworks preferred
                    <br />
                    <p>JavaScript ~ React, Redux</p>
                    <input type="radio" name="language" onChange={handleChangeIn('language', 'javascript')} />
                    <p>Python ~ Django, Flask (web developement)</p>
                    <input type="radio" name="language" onChange={handleChangeIn('language', 'pythonweb')} />
                    <p>Java</p>
                    <input type="radio" name="language" onChange={handleChangeIn('language', 'java')} />
                    <p>Ruby and Ruby on Rails</p>
                    <input type="radio" name="language" onChange={handleChangeIn('language', 'ruby')} />
                    <p>The C Language </p>
                    <input type="radio" name="language" onChange={handleChangeIn('language', 'clanguage')} />
                    <p>Python ~ TensorFlow (machine learning) </p>
                    <input type="radio" name="language" onChange={handleChangeIn('language', 'pythonml')} />
                </label>
                <br />
                <label>
                    Years of coding experience
                    <br />
                    <p>0 - 1 </p>
                    <input type="radio" name="language" onChange={handleChangeIn('yearsOfExperience', '0to1')} />
                    <p>2 - 3 </p>
                    <input type="radio" name="language" onChange={handleChangeIn('yearsOfExperience', '2to3')} />
                    <p>4 - 5</p>
                    <input type="radio" name="language" onChange={handleChangeIn('yearsOfExperience', '4to5')} />
                    <p>6 or over</p>
                    <input type="radio" name="language" onChange={handleChangeIn('yearsOfExperience', '6')} />
                </label>
                
                <label>
                    Do you want to work with someone who has less experience than you?
                    <br />
                    <p>yes</p>
                    <input type="radio" name="similarAnswer" onChange={handleChangeIn('lessExperiencePair', true)} />
                    <p>no</p>
                    <input type="radio" name="similarAnswer" onChange={handleChangeIn('lessExperiencePair', false)} />
                </label>
                
                <h4>Logistics</h4>
                <br />
                <label>
                    How far are you willing to travel (miles)?
                    <p> 0 - 5 </p>
                    <input type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '0to5')} />
                    <p> 5 - 10 </p>
                    <input type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '5to10')} />
                    <p> 10 - 15 </p>
                    <input type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '10to15')} />
                    <p> 15 - 20 </p>
                    <input type="radio" name="travelDistance"onChange={handleChangeIn('travelDistance', '15to20')} />

                </label>
                
                <input type="submit" value="Finish" />
             </form>
         </>
    )
}

export default Questionnaire;