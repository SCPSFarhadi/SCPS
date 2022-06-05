import { Graph } from "react-d3-graph";
import React from 'react';
import {useSelector,connect} from "react-redux";
import store from "../../store";
import SimpleDialog from "./Dialog";
import {green, red} from "@mui/material/colors";
import actions from "redux-form/lib/actions";

// the graph configuration, just override the ones you need
const myConfig = {
    nodeHighlightBehavior: true,
    node: {
        color: "green",
        size: 820,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};

function MakeGraph(props) {
    let count_run = 0;
    // make a dialog ready:
    const [open, setOpen] = React.useState(false);
    const [selectedNode, setSelectedNode] = React.useState("");
    const [nodeColor, setColor] = React.useState(green);
    const [dataState, setData] = React.useState(props.data);
    const handleClickOpen = (node) => {
        setSelectedNode(node);
        setOpen(true);
    };

    // console.log(props.data)
    // React.useEffect( () => {
    //     if(props.Errors && props.Errors.id && props.Errors.id.length !== 0) {
    //
    //         let listErrorsID = props.Errors.id
    //         let listErrorColor = props.Errors.status
    //         let modData = { ...dataState };
    //         for (let index = 0; index < listErrorsID.length; ++index) {
    //             let selectNode = modData.nodes.filter(item => {
    //                 return item.id === listErrorsID[index];
    //             });
    //             console.log(selectNode)
    //             selectNode.forEach(item => {
    //                 console.log(item)
    //                 // if(item.color){
    //                     console.log(listErrorColor[index])
    //                     console.log(item)
    //                     item.color = listErrorColor[index];
    //                 // }
    //
    //             });
    //         }
    //         setData(modData)
    //     }
    // }, [props.Errors])

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        let nodes = props.data.nodes;
        // eslint-disable-next-line array-callback-return
        nodes.map((node)=>{
            let availableNode = document.getElementById(node.id);
            if (availableNode) {
                availableNode.addEventListener('click',function (){
                    handleClickOpen(node);
                })
            }
        })
    }, [])

    let dateTempconfig = useSelector(() => store.getState().receiveData.config);


    if(Object.keys(dateTempconfig).length !== 0){
        dateTempconfig = JSON.parse(dateTempconfig);
        console.log(dateTempconfig)
        // for(let x in dateTempconfig){
        //     data['links'].push(dateTempconfig[x]['DateTime']);
        // }
        // for(let x in dateTempObj){
        //     temps.push(dateTempObj[x]['temperature']);
        // }
    }


    const onDoubleClickNode = function(nodeId) {
        let modData = { ...dataState };

        let selectNode = modData.nodes.filter(item => {
            return item.id === nodeId;
        });
        selectNode.forEach(item => {
            if (item.color && item.color === "red") item.color = "blue";
            else item.color = "red";
        });
        setData(modData );
    };
    return (
        <div>
            <div>
                <SimpleDialog
                    open={open}
                    onClose={handleClose}
                    selectedNode={selectedNode}
                    nodeColor={nodeColor}
                />
            </div>
            <div style={{height:'100%',width:'100%'}}>
                <Graph
                    id="graph-id" // id is mandatory
                    data={props.data}
                    config={myConfig}
                    // onDoubleClickNode = {onDoubleClickNode}
                    on
                />
            </div>
        </div>

    );
}

function mapStateToProps(state) {
    return { Errors:state.errors };
}

export default connect(mapStateToProps)(MakeGraph);

// export default MakeGraph;