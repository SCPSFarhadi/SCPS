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
        if(matrixSize.rows>0){
            let matrix = Array(matrixSize.rows)
            for (let i = 0; i < matrixSize.rows; i++) {
                matrix[i] = new Array(matrixSize.columns).fill(0)
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
                <form onSubmit={handleSubmit}>
                    {matrix.map((row, indexRow = 1) => {
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
                    <button>{"Save A"}</button>
                </form>
            );
        }
        else{
            return(
                <h3>please input a valid number!</h3>
            )
        }

    }

    return (
        <div>
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
            <div style={{overflow: 'scroll', height:'300px', width:'1000px'}}>
                <MatrixInput matrixSize={matrixSize} setMatrix={matrix => setMatrix(matrix)} />
            </div>
        </div>



    );
}

export default Matrix;