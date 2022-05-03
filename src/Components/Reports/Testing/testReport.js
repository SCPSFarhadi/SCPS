import * as React from 'react';
import "@progress/kendo-theme-material/dist/all.css";
import { Grid, GridColumn } from "@progress/kendo-react-grid";
import { process } from "@progress/kendo-data-query";

import { bikeStations } from "./data";

const BooleanCell = (props) => {
    return (
        <td>{props.dataItem[props.field] ? '✅' : '❌'}</td>
    )
}

export default function TestReport() {

    const [dataState, setDataState] = React.useState({ skip: 0, take: 10 })
    const [result, setResult] = React.useState(process(bikeStations, dataState));

    const onDataStateChange = (event) => {
        setDataState(event.dataState);
        setResult(process(bikeStations, event.dataState));
    }

    return (
        <Grid
            data={result}
            filterable={true}
            onDataStateChange={onDataStateChange}
            pageable={true}
            total={bikeStations.length}
            {...dataState}
            resizable={true}
        >
            <GridColumn field="ID" title="ID"/>
            <GridColumn field="Type" title="Type" />
            <GridColumn field="status" title="status" />
            <GridColumn field="pass_rate" title="Pass rate" />
            <GridColumn field="result" title="Station" cell={BooleanCell} />
            <GridColumn field="zone" title="Zone" />
        </Grid>
    );
}