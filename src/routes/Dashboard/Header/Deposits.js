import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import PieChart from "../../../Components/PieChart";
import {ResponsiveContainer} from "recharts";

function preventDefault(event) {
    event.preventDefault();
}

export default function Deposits() {
    return (

        <React.Fragment>
            <Title>Nodes status</Title>
                <ResponsiveContainer height='100%' width='100%'>
                    <PieChart height={300}/>
                </ResponsiveContainer>
        </React.Fragment>
    );
}