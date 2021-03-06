import axios from 'axios';

import {
    RECEIVE_DATA_NODE_TEM,
    RECEIVE_DATA_CONFIG,
    RECEIVE_NOTIFICATION,
    RECEIVE_PICHART,
    RECEIVE_ROOMTEMP, RECEIVE_SETNODE
} from "./types";

// GET LEADS

export const receiveDataNodeTem = (data) => (dispatch) => {
        dispatch({
            payload: data,
            type: RECEIVE_DATA_NODE_TEM
        })
}
export const receiveDataConfig = (data) => (dispatch) => {
    console.log(data)
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
export const receivePiechart = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_PICHART
    })
}
export const receiveًRoomTemp = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_ROOMTEMP
    })
}
export const receiveًNodeTemp = (data) => (dispatch) => {
    dispatch({
        payload: data,
        type: RECEIVE_ROOMTEMP
    })
}

export const setNodes = (data) => (dispatch) => {
    console.log("fadayat shavam22...")
    console.log(data)
    dispatch({
        payload: data,
        type: RECEIVE_SETNODE
    })
}