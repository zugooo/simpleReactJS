import {GET_FEED} from '../action'

const initialState = {
    feed:[],
    loading:true
}

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    switch(action.type){
        case GET_FEED:
        return {
            ...state,
            feed:action.payload,
            loading:false
        }
        default: return state
    }

}