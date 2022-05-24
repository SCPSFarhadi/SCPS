import axios from 'axios';

import {RECEIVE_DATA_NODE_TEM, RECEIVE_DATA_CONFIG, RECEIVE_NOTIFICATION} from "./types";

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
export const receiveNotification = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_NOTIFICATION
    })
}