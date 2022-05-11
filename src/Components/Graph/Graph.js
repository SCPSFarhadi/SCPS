import { Graph } from "react-d3-graph";
import React from 'react';
import {useSelector} from "react-redux";
import store from "../../store";
import SimpleDialog from "./Dialog";
import {green, red} from "@mui/material/colors";
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
        color: "green",
        size: 820,
        highlightStrokeColor: "blue",
    },
    link: {
        highlightColor: "lightblue",
    },
};



function MakeGraph(props) {

    // make a dialog ready:
    const [open, setOpen] = React.useState(false);
    const [selectedNode, setSelectedNode] = React.useState("");
    const [nodeColor, setColor] = React.useState(green);

    const handleClickOpen = (node) => {
        setSelectedNode(node);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    // {emails.map((email) => (
    //     <ListItem button onClick={() => handleListItemClick(email)} key={email}>
    //         <ListItemAvatar>
    //             <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
    //                 <PersonIcon />
    //             </Avatar>
    //         </ListItemAvatar>
    //         <ListItemText primary={email} />
    //     </ListItem>
    // ))}



    React.useEffect(() => {
        let nodes = data.nodes;
        // eslint-disable-next-line array-callback-return
        console.log("making graph by config")
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

    console.log("making graph by config")
    console.log(dateTempconfig)

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
                    data={data}
                    config={myConfig}
                />
            </div>
        </div>

    );
}

export default MakeGraph;