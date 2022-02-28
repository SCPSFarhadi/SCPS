import React, {useState} from 'react';
import Button from "@mui/material/Button";

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
                    <div style={{overflow: 'scroll', height: '300px', width: '100%'}}>
                        {getInput(matrix)}
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={{overflow: 'scroll', height: '300px', width: '33%',flexGrow: '1'}}>
                            {getInput(matrixLimit1)}
                        </div>
                        <div style={{overflow: 'scroll', height: '300px', width: '33%',flexGrow: '1'}}>
                            {getInput(matrixLimit2)}
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
            <label>make n*n matrix by input</label>
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
            </form>
            <br/>
            <MatrixInput matrixSize={matrixSize} setMatrix={matrix => setMatrix(matrix)} />

        </div>



    );
}

export default Matrix;