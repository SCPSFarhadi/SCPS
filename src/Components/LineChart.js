import React from 'react';
import Chart from 'react-apexcharts';
import {ResponsiveContainer} from "recharts";
import {useSelector} from "react-redux";
import store from "../store";
import receiveData from "../Reducers/receiveData";
function LineChart(props) {

    let dateTempObj = useSelector(() => store.getState().receiveData.time);
    let times = [];
    let temps = [];
    if(Object.keys(dateTempObj).length !== 0){
        dateTempObj = JSON.parse(dateTempObj);
        for(let x in dateTempObj){
            times.push(dateTempObj[x]['DateTime']);
        }
        for(let x in dateTempObj){
            temps.push(dateTempObj[x]['temperature']);
        }
    }
    console.log("in Line Chart")
    console.log(dateTempObj)

    console.log(times)
    console.log(temps)
    const series = [
        {
            name: "Guests",
            data: temps
        }
    ];
    const options = {
        xaxis: {
            categories: times
        }
    };
    return (
            <Chart type="line" series={series} options={options} />
    );

}

export default LineChart;

// import React from 'react';
// import {Line} from 'react-chartjs-2'
//
// function LineChart(props) {
//     const data = {
//     labels: [1,2,3,4,5,6],
//     datasets: [{
//         label: 'Temperature By Time',
//         data: [65, 59, 80, 81, 56, 55, 40],
//         fill: false,
//         borderColor: 'rgb(75, 192, 192)',
//         tension: 0.1
//     }]
// }
//     return (
//         <div>
//             <Line data={data}/>
//         </div>
//         // function dates(current) {
// //     var week= new Array();
// //     // Starting Monday not Sunday
// //     current.setDate((current.getDate() - current.getDay() +1));
// //     for (var i = 0; i < 7; i++) {
// //         week.push(
// //             new Date(current)
// //         );
// //         current.setDate(current.getDate() +1);
// //     }
// //     return week;
// // }
//
//     );
// }
//
// export default LineChart;


// import logo from './logo.svg';
// import './App.css';
// import { Line } from 'react-chartjs-2';
//
// const data = {
//     labels: ['Jan', 'Mar', 'May', 'July', 'Oct'],
//     datasets: [
//         {
//             label: 'Iphone sales',
//             data: [400, 1000, 4000, 800, 1500],
//             fill: true,
//             backgroundColor:"#2e4355",
//             pointBorderColor:"#8884d8",
//             pointBorderWidth:5,
//             pointRadius:8,
//             tension: 0.4
//         },
//     ],
// };
//
// const options = {
//     plugins:{legend:{display:false}},
//     layout:{padding:{bottom:100}},
//     scales: {
//         y:{
//             ticks:{
//                 color:"white",
//                 font:{
//                     size:18
//                 }
//             },
//             grid:{
//                 color:"#243240"
//             }
//         },
//         x:{
//             ticks:{
//                 color:"white",
//                 font:{
//                     size:18
//                 }
//             }
//         }
//     },
// };
//
// function LineChart() {
//     return (
//         <div className="App">
//             <h2>Quarterly sales for mobile phones</h2>
//             <Line data={data} options={options}/>
//         </div>
//     );
// }
//
// export default LineChart;