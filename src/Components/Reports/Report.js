import React, { Fragment, useState } from "react";
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import {filterBy} from "@progress/kendo-data-query";
// import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { alpha } from '@material-ui/core/styles';
import Button from "@mui/material/Button";
import {HOST_URL} from "../../settings";
import axios from "axios";

let states = [
    {
        "Time":"2022-09-03 18:05:36",
        "ID":"1",
        "Temp": "25",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"

    },
    {
        "Time":"2022-09-03 18:06:49",
        "ID":"1",
        "Temp": "26",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    },
    {
        "Time":"2022-09-03 18:10:20",
        "ID":"1",
        "Temp": "26.5",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    },
    {
        "Time":"2022-09-03 18:11:36",
        "ID":"1",
        "Temp": "28.2",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    },
    {
        "Time":"2022-09-03 18:14:26",
        "ID":"1",
        "Temp": "28",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    },
    {
        "Time":"2022-09-03 18:19:46",
        "ID":"1",
        "Temp": "29",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    },
    {
        "Time":"2022-09-03 18:25:36",
        "ID":"1",
        "Temp": "28.75",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    },
    {
        "Time":"2022-09-03 18:29:43",
        "ID":"1",
        "Temp": "28.5",
        "Humidity":"Null",
        "Light":"Null",
        "AnalogSensor1":"Null",
        "AnalogSensor2":"Null"
    }
];





const initialFilter = {
    logic: "and",
    filters: [

    ],
};

export default function ReportStates() {

    const [filter, setFilter] = React.useState(initialFilter);
    const [newStates, setNewStates] = React.useState(states)
    const [selectedDate, handleDateChange] = useState(new Date());
    const _export = React.useRef(null);
    let gridPDFExport;

    const exportPDF = () => {
        if (gridPDFExport !== null) {
            gridPDFExport.save();
        }
    };
    const excelExport = () => {
        if (_export.current !== null) {
            _export.current.save();
        }
    };

    const BooleanCell = (props) => {
        return (
            <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
        )
    }

    function getGrid() {
        function submitDate(event) {
            event.preventDefault()
            let from = document.getElementById('fromDateReport').value
            let to = document.getElementById('toDateReport').value

            let url = HOST_URL+"/api/users/report/";
            let data2 = {
                from:from,
                to:to
            }
            axios.post(url, data2, { // receive two parameter endpoint url ,form data
            })
                .then(res => { // then print response status
                    console.log("get data:")
                    console.log(res);
                    setNewStates(res)
                })

        }

        return <Grid data={filterBy(newStates, filter)}

                     style={{
                         height: '1020px'
                     }}>
            <GridToolbar>
                <button title="Export Excel"
                        className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                        onClick={excelExport}>
                    Export to Excel
                </button>
                <button
                    title="Export PDF"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    onClick={exportPDF}
                >
                    Export PDF
                </button>

            </GridToolbar>
            <GridToolbar>
            <span style={{marginTop:"15px"}}>
                <label style={{fontWeight:"bold"}}>
                    From date:
                </label>
                <input type="date" id="fromDateReport"/>
            </span>{"          "}
            <span style={{marginTop:"15px"}}>
                <label style={{fontWeight:"bold"}}>
                    To date:
                </label>
                <input type="date" id="toDateReport"/>
            </span>{"   "}
            <span style={{marginTop:"15px"}}>
                <Button type="submit" onClick={submitDate} >Submit</Button>
            </span>
            </GridToolbar>

            <GridColumn field="ID" title="ID"
                        filter="date"
                        format="{0:d}"
                        disableColumnFilter/>
            <GridColumn field="Time" title="Time"/>
            <GridColumn field="Temp"  title="Temperature"/>
            <GridColumn field="Humidity" title="Humidity Sensor"/>
            <GridColumn field="Light" title="Light Sensor"/>
            <GridColumn field="AnalogSensor1" title="Analog Sensor 1"/>
            <GridColumn field="AnalogSensor2" title="Analog Sensor 2"/>
        </Grid>
            ;

    }

    return <ExcelExport data={newStates} ref={_export}>
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
            {getGrid()}
        </GridPDFExport>
            {getGrid()}
    </ExcelExport>;
};