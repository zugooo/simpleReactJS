import axios from '../../../node_modules/axios';
export const GET_FEED = 'GET FEED';
export const FEED_ERROR = 'FEED ERROR';

export const getFeed = () => async dispatch => {
    try {
        const res = await axios.get('http://localhost:8001/flickr')
        dispatch ({
            type: GET_FEED,
            payload: res.data.feed.entry
        })
    }
    catch(e) {
        dispatch ({
            type: FEED_ERROR,
            payload: console.log(e)
        })
    }
}


