import {createStore, applyMiddleware} from 'redux'
import thunk from '../../node_modules/redux-thunk'
import {composeWithDevTools} from '../../node_modules/redux-devtools-extension'

import rootReducer from './reducer'

const initalState = {

}

const middleware = [thunk]

const store = createStore(rootReducer, initalState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;