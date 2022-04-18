import axios from 'axios';

import {RECEIVE_DATA_NODE_TEM,RECEIVE_DATA_CONFIG} from "./types";

// GET LEADS

export const receiveDataNodeTem = (data) => (dispatch) => {
        dispatch({
            payload: data,
            type: RECEIVE_DATA_NODE_TEM
        })
}
export const receiveDataConfig = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_DATA_CONFIG
    })
}