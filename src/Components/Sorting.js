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
    let count = 0
    let matchedPeople = []

function handleComparison(user, otherPerson) {
        if (compareCodingPreferences(user, otherPerson) && comparePersonality(user, otherPerson)) {
                matchedPeople.push(otherPerson)
                count++
                console.log('person matched')
        } else {
            console.log('person not matched')
        }
}

export const comparePerson = (user, otherPeople) => {
    otherPeople.filter(otherPerson => handleComparison(user, otherPerson))
    return matchedPeople
}