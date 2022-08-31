import React, { Component } from "react";
import Chart from "react-apexcharts";

// class LineChart extends Component {
//     // constructor(props) {
//     //     super(props);
//     //
//     //     this.state = {
//     //         options: {
//     //             chart: {
//     //                 id: "basic-bar"
//     //             },
//     //             xaxis: {
//     //                 // categories: [7,8,9,10,11, 12, 13, 14, 15, 16, 17, 18]
//     //                 categories: props.times
//     //             }
//     //         },
//     //         series: [
//     //             {
//     //                 name: "series-1",
//     //                 // data: [26, 21, 25, 20, 23, 29, 31, 32]
//     //                 data: props.temps
//     //             }
//     //         ]
//     //     };
//     // }
//
//     render() {
//         console.log("in line chart")
//         console.log(this.props.temps)
//         console.log(this.props.times)
//         const series = [
//             {
//                 name: "Guests",
//                 // data: props.temps
//                 data: this.props.temps
//             }
//         ];
//         const options = {
//             xaxis: {
//                 // categories: props.times
//                 categories: this.props.times
//             }
//         };
//
//         return (
//             <div className="app">
//                 <div className="row">
//                     <div className="mixed-chart">
//                         <h1>Node Temperature</h1>
//                         <Chart
//                             options={series}
//                             series={options}
//                             type="line"
//                             width="700"
//
//                         />
//
//                     </div>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default LineChart;


function LineChart2(props) {
    const series = [
        {
            name: "Guests",
            // data: props.temps
            data: props.temps
        }
    ];
    const options = {
        xaxis: {
            // categories: props.times
            categories: props.times
        }
    };
    // const series = [
    //     {
    //         name: "Guests",
    //         // data: props.temps
    //         data: ["24.25","25.26","27.78","28.20","28.80","29"]
    //     }
    // ];
    // const options = {
    //     xaxis: {
    //         // categories: props.times
    //         categories: ["1401-03-18 12:39:55","1401-03-18 14:39:55","1401-03-18 18:39:55","1401-03-18 21:39:55","1401-03-19 12:39:55","1401-03-19 18:39:55"]
    //     }
    // };
    return (
        <Chart type="line" series={series} options={options} />
    );

}

export default LineChart2;