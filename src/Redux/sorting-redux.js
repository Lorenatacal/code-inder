export const initialState = {
    matchedPeople = []
}

export const reducer = (state = initialState, action) => {
    switch(action.type) {
        case "ADD_TO_MATCHED_PEOPLE":
            return {
                ...state,
                matchedPeople: [...matchedPeople, action.payload]
            }
    }
}


export const addToMatchedPeople = (person) => {
    return {
        type: "ADD_TO_MATCHED_PEOPLE",
        payload: person
    };
 };