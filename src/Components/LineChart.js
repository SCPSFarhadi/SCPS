import React from 'react';
import Chart from 'react-apexcharts';
import {ResponsiveContainer} from "recharts";
import {useSelector} from "react-redux";
import store from "../store";
import receiveData from "../Reducers/receiveData";
function LineChart(props) {

    console.log("in line chart")
    console.log(props.temps)
    console.log(props.times)
    const series = [
        {
            name: "Guests",
            data: props.temps
        }
    ];
    const options = {
        xaxis: {
            categories: props.times
        }
    };
    return (
            <Chart type="line" series={series} options={options} />
    );

}

export default LineChart;