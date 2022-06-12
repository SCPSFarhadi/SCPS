import {
    RECEIVE_DATA_NODE_TEM,
    RECEIVE_DATA_CONFIG,
    RECEIVE_NOTIFICATION,
    RECEIVE_PICHART,
    RECEIVE_ROOMTEMP,
    RECEIVE_NODETEMP
} from '../Actions/types.js';

const initialState={
    config: [],
    time: [],
    temp: [],
    notification: [],
    pychart: [],
    roomTemp: [],

}
function createData(time, amount) {
    return { time, amount };
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
        case RECEIVE_PICHART:
            return {
                ...state,
                pychart: action.payload
            };
        case RECEIVE_ROOMTEMP:
            let msg = JSON.parse(action.payload)
            return {
                ...state,
                roomTemp: [...state.roomTemp,createData(msg.date,msg.tem)]
            };
        case RECEIVE_NODETEMP:
            let msgNode = JSON.parse(action.payload)
            return {
                ...state,
                time: [...state.time, msgNode.time],
                temp: [...state.temp, msgNode.temp]
            }
        default:
            return state;
    }
}