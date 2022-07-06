import axios from 'axios';

import {GET_LEADS} from "./types";

// GET LEADS

export const getLeads = () => dispatch => {
    axios.get("http://84.241.60.84:8000/api/data/sendjson/")
        .then(res=>{
            dispatch({
                payload: res.data,
                type: GET_LEADS
            })
        }).catch(err=>{
            console.log(err);
    })
}
