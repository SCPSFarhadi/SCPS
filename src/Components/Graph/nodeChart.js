import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineChart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    id: "basic-bar"
                },
                xaxis: {
                    categories: [7,8,9,10,11, 12, 13, 14, 15, 16, 17, 18]
                }
            },
            series: [
                {
                    name: "series-1",
                    data: [26, 21, 25, 20, 23, 29, 31, 32]
                }
            ]
        };
    }

    render() {
        return (
            <div className="app">
                <div className="row">
                    <div className="mixed-chart">
                        <h1>Node Temperature</h1>
                        <Chart
                            options={this.state.options}
                            series={this.state.series}
                            type="line"
                            width="700"

                        />

                    </div>
                </div>
            </div>
        );
    }
}

export default LineChart;