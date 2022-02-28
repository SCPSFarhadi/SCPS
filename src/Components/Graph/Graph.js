import { Graph } from "react-d3-graph";
import React from 'react';
// graph payload (with minimalist structure)
const data = {
    nodes: [{ id: "node1" }, { id: "node2" }, { id: "node3" }],
    links: [
        { source: "node1", target: "node2" },
        { source: "node2", target: "node3" },
    ],
};

// the graph configuration, just override the ones you need
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "red",
        size: 820,
        highlightStrokeColor: "blue",

    },
    link: {
        highlightColor: "lightblue",
    },
};



function MakeGraph(props) {
    return (
        <div>
            <Graph
                id="graph-id" // id is mandatory
                data={data}
                config={myConfig}
            />
        </div>
    );
}

export default MakeGraph;