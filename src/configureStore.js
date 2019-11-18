import { applyMiddleware, createStore } from 'redux'
import  thunkMiddleware  from 'redux-thunk'

import { verifyAuth } from './Redux/Actions/'
import  rootReducer  from './Redux/Reducers'
import { compose } from 'redux'

const storeEnhance = compose(applyMiddleware(thunkMiddleware), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default function configureStore() {
    const store = createStore(
        rootReducer,
        {},
        storeEnhance
    )
    store.dispatch(verifyAuth())
    return store
}