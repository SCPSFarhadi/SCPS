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
            // data: props.temps
            data: ["24.25","25.26","25.78","26.2","24.5","23.65"]
        }
    ];
    const options = {
        xaxis: {
            // categories: props.times
            categories: ["1401-03-18 12:39:55","1401-03-18 14:39:55","1401-03-18 18:39:55","1401-03-18 21:39:55","1401-03-19 12:39:55","1401-03-19 18:39:55"]
        }
    };
    return (
            <Chart type="line" series={series} options={options} />
    );

}

export default LineChart;