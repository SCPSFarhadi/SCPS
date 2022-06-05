import { GET_ERRORS } from '../Actions/types';

const initialState = {
    msg: [],
    status: [],
};

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_ERRORS:
            // console.log("saved error "+action.payload.msg)
            return {
                msg: [...state.msg,action.payload.msg],
                status: [...state.status,action.payload.status]
            };
        default:
            return state;
    }
}
