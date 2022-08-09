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
        function submitDate() {

        }

        return <Grid data={filterBy(states, filter)}
                     filterable={true}
                     filter={filter}
                     onFilterChange={(e) => setFilter(e.filter)}
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
                <input type="date" id="fromDate"/>
            </span>{"          "}
            <span style={{marginTop:"15px"}}>
                <label style={{fontWeight:"bold"}}>
                    To date:
                </label>
                <input type="date" id="toDate"/>
            </span>{"   "}
            <span style={{marginTop:"15px"}}>
                <Button type="submit" onSubmit={submitDate} >Submit</Button>
            </span>
                {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                {/*    <DateTimePicker*/}
                {/*        autoOk*/}
                {/*        ampm={false}*/}
                {/*        value={selectedDate}*/}
                {/*        disableFuture={true}*/}
                {/*        onChange={handleDateChange}*/}
                {/*        label="From Date:"*/}
                {/*    />*/}

                {/*    <DateTimePicker*/}
                {/*        value={selectedDate}*/}
                {/*        disablePast*/}
                {/*        onChange={handleDateChange}*/}
                {/*        disableFuture={true}*/}
                {/*        label="To"*/}
                {/*        showTodayButton*/}
                {/*    />*/}
                {/*</MuiPickersUtilsProvider>*/}
            </GridToolbar>

            <GridColumn field="ID" title="ID"
                        filter="date"
                        format="{0:d}"/>
            <GridColumn field="Temp" title="Temperature"/>
            <GridColumn field="active" title="active" cell={BooleanCell}/>
            <GridColumn field="status" title="status"/>
            <GridColumn field="comment" title="comment"/>
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