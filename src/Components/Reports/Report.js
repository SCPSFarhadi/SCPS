import React, { Fragment, useState } from "react";
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import {states} from './states.js';

import {filterBy} from "@progress/kendo-data-query";
// import DateFnsUtils from '@date-io/date-fns';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { alpha } from '@material-ui/core/styles';
import Button from "@mui/material/Button";
import {HOST_URL} from "../../settings";
import axios from "axios";

const initialFilter = {
    logic: "and",
    filters: [

    ],
};

export default function ReportStates() {

    const [filter, setFilter] = React.useState(initialFilter);
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

            let url = HOST_URL+"/api/users/ReportNodeStation/";
            let data2 = {
                from:from,
                to:to
            }
            axios.post(url, data2, { // receive two parameter endpoint url ,form data
            })
                .then(res => { // then print response status
                    console.log(res);
                })

        }

        return <Grid data={filterBy(states, filter)}

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

    return <ExcelExport data={states} ref={_export}>
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
            {getGrid()}
        </GridPDFExport>
            {getGrid()}
    </ExcelExport>;
};