import React, {useState} from 'react';
import Button from "@mui/material/Button";
import CsvReader from "./CsvReader";

function Matrix(props) {
    const [matrixSize, setMatrixSize] = useState({
        rows: 2,
        columns: 2,
    })
    const [matrix, setMatrix] = useState([[0, 0], [0, 0]])
    const [latexMatrix, setLatexMatrix] = useState(
        "\\begin{pmatrix}\n 0 & 0\\\\\n 0 & 0\n \\end{pmatrix}",
    );

    function MatrixInput(props) {
        function getInput(matrixLimit1) {
            return <>
                {matrixLimit1.map((row, indexRow = 1) => {
                    return (
                        <div style={{display: 'flex'}} key={indexRow}>
                            {row.map((item, indexColumn = 1) => {
                                return (
                                    <input
                                        key={indexRow + " " + indexColumn}
                                        type="text"
                                        defaultValue={0}
                                        name={indexRow + "," + indexColumn}
                                    />
                                )
                            })}
                        </div>
                    )
                })}
            </>;
        }

        if(matrixSize.rows>0){
            // for constants
            let matrix = Array(matrixSize.rows)
            for (let i = 0; i < matrixSize.rows; i++) {
                matrix[i] = new Array(matrixSize.columns).fill(0)
            }
            // for limits
            let matrixLimit1 = Array(matrixSize.rows)
            for (let i = 0; i < matrixSize.rows; i++) {
                matrixLimit1[i] = new Array(1).fill(0)
            }
            // for limits
            let matrixLimit2 = Array(matrixSize.rows)
            for (let i = 0; i < matrixSize.rows; i++) {
                matrixLimit2[i] = new Array(1).fill(0)
            }
            let matrixU = Array(1)
            matrixU[0] = new Array(matrixSize.columns).fill(0)


            let matrixV = Array(1)
            matrixV[0] = new Array(matrixSize.columns).fill(0)

            const handleSubmit = event => {
                event.preventDefault();
                let count = 0;
                for (let i = 0; i < matrixSize.rows; i++) {
                    for (let j = 0; j < matrixSize.columns; j++) {
                        // If the floating point number cannot be parsed, we set 0 for this value
                        matrix[i][j] = !isNaN(parseFloat(event.target[count].value)) ? parseFloat(event.target[count].value) : 0;
                        count += 1;
                    }
                }
                setMatrix(matrix);
            }
            return (
                <form onSubmit={handleSubmit} dir={'rtl'}>
                    <h3>Matrix</h3>
                    <div style={{overflow: 'scroll', height: '300px', width: '100%'}}>
                        {getInput(matrix)}
                    </div>
                    <h3>Limits</h3>
                    <div style={{display: 'flex'}}>
                        <label>Upper bound</label>
                        <div style={{overflow: 'scroll', height: '300px', width: '33%',flexGrow: '1'}}>
                            {getInput(matrixLimit1)}
                        </div>
                        <label>Lower bound</label>
                        <div style={{overflow: 'scroll', height: '300px', width: '33%',flexGrow: '1'}}>
                            {getInput(matrixLimit2)}
                        </div>
                    </div>
                    <h3>Vectors</h3>
                    <div>
                        <label>U Vector: </label>
                        <div style={{overflow: 'scroll', width: '100%%',flexGrow: '1'}}>
                            {getInput(matrixU)}
                        </div>
                        <label>V Vector: </label>
                        <div style={{overflow: 'scroll', width: '100%%',flexGrow: '1'}}>
                            {getInput(matrixV)}
                        </div>
                    </div>

                    <button>{"Save Limit and constants"}</button>
                </form>

            );
        }
        else{
            return(
                <h3>please input a valid natural number!</h3>
            )
        }

    }


    return (
        <div  dir={'rtl'}>
            <h2>make n*n matrix by input</h2>
            <form>
                <input
                    type="number"
                    defaultValue={2}
                    onChange={e => {
                        const rows = parseInt(e.target.value)
                        // if we only want matrix of size between 2 and 8
                        // if (2 <= rows && rows <= 8) {
                        setMatrixSize( {
                            columns: rows,
                            rows: rows,
                        })
                        // }
                    }}
                />
                <CsvReader />
            </form>
            <br/>
            <MatrixInput matrixSize={matrixSize} setMatrix={matrix => setMatrix(matrix)} />

        </div>



    );
}

export default Matrix;