import {RECEIVE_DATA_NODE_TEM,RECEIVE_DATA_CONFIG,RECEIVE_NOTIFICATION} from '../Actions/types.js';

const initialState={
    config: [],
    time: [],
    temp: [],
    notification: []
}

export default function(state=initialState,action){
    switch (action.type){
        case RECEIVE_DATA_CONFIG:
            return {
                ...state,
                config: action.payload
            };
        case  RECEIVE_DATA_NODE_TEM:
            const obj = JSON.parse(action.payload)
            console.log((obj))
            return{
              ...state,
                time: [...state.time, obj],
                temp: [...state.temp, action.payload]
            };
        case RECEIVE_NOTIFICATION:
            return {
                ...state,
                notification: action.payload
            };
        default:
            return state;
    }
}