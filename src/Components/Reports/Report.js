import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Grid, GridColumn, GridToolbar } from '@progress/kendo-react-grid';
import { ExcelExport } from '@progress/kendo-react-excel-export';
import { GridPDFExport } from "@progress/kendo-react-pdf";
import {states} from './states.js';
import {ColumnMenu} from "./ColumnMenu";
import {filterBy} from "@progress/kendo-data-query";
const initialFilter = {
    logic: "and",
    filters: [

    ],
};

export default function ReportStates() {
    const [filter, setFilter] = React.useState(initialFilter);
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
        return <Grid data={filterBy(states, filter)}
                     filterable={true}
                     filter={filter}
                     onFilterChange={(e) => setFilter(e.filter)}
                     style={{
                         height: '420px'
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
            <GridColumn field="ID" title="ID"
                        filter="date"
                        format="{0:d}"/>
            <GridColumn field="Temp" title="Temperature"/>
            <GridColumn field="active" title="active" cell={BooleanCell}/>
            <GridColumn field="status" title="status"/>
            <GridColumn field="comment" title="comment"/>
        </Grid>;
    }

    return <ExcelExport data={states} ref={_export}>
        <GridPDFExport ref={(pdfExport) => (gridPDFExport = pdfExport)}>
            {getGrid()}
        </GridPDFExport>
            {getGrid()}
    </ExcelExport>;
};