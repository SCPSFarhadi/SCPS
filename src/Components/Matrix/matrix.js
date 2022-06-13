import React, {useState} from 'react';
import Button from "@mui/material/Button";
import CsvReader from "./CsvReader";

function Matrix(props) {
    const [matrixSize, setMatrixSize] = useState({
        N: 2,
        no: 2,
        nu:2,
        ns:2,
    })
    const [matrix, setMatrix] = useState([[0, 0], [0, 0]])
    const [latexMatrix, setLatexMatrix] = useState(
        "\\begin{pmatrix}\n 0 & 0\\\\\n 0 & 0\n \\end{pmatrix}",
    );

    function MatrixInput(props) {
        function getInput(matrixLimit1) {
            console.log(matrixLimit1)
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

        if(matrixSize.N>0 && matrixSize.no>0 && matrixSize.nu>0 && matrixSize.ns>0){
            // Q Matrix
            let matrixQ = Array(matrixSize.N * matrixSize.no)
            for (let i = 0; i < matrixSize.N * matrixSize.no; i++) {
                matrixQ[i] = new Array(matrixSize.N * matrixSize.nu).fill(0)
            }
            // F Matrix
            let matrixF = Array(matrixSize.N * matrixSize.no)

            for (let i = 0; i < matrixSize.N * matrixSize.no; i++) {
                matrixF[i] = new Array(matrixSize.ns*1).fill(0)
            }
            let matrixM = Array(matrixSize.N * matrixSize.nu)
            for (let i = 0; i < matrixSize.N * matrixSize.nu; i++) {
                matrixM[i] = new Array(matrixSize.N * matrixSize.nu).fill(0)
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
                    <h3>Matrix F</h3>
                    <div style={{overflow: 'scroll', height: '300px', width: '100%'}}>
                        {getInput(matrixF)}
                    </div>
                    <h3>Matrix Q</h3>
                    <div style={{overflow: 'scroll', height: '300px', width: '100%'}}>
                        {getInput(matrixQ)}
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
                <label>
                    input N :
                </label>
                <input
                type="number"
                defaultValue={2}
                id="nInput"
                />
                <br/>
                <label>
                    input no:
                </label>
                <input
                    type="number"
                    defaultValue={2}
                    id="noInput"
                />
                <br/>
                <label>
                    input nu:
                </label>
                <input
                    type="number"
                    defaultValue={2}
                    id="nuInput"
                />
                <br/>

                <label>
                    input ns:
                </label>
                <input
                    type="number"
                    defaultValue={2}
                    id="nsInput"
                />
                <br/>

                <button
                    onClick={e => {
                        e.preventDefault();
                        const NInput = document.getElementById("nInput")
                        const noInput = document.getElementById("noInput")
                        const nuInput = document.getElementById("nuInput")
                        const nsInput = document.getElementById("nsInput")
                        console.log(nsInput)
                        // if we only want matrix of size between 2 and 8
                        // if (2 <= rows && rows <= 8) {
                        setMatrixSize( {
                            N: NInput.value,
                            no: noInput.value,
                            nu:nuInput.value,
                            ns:nsInput.value,
                        })
                        // }
                    }}
                >set numbers</button>
                <CsvReader />
            </form>
            <br/>
            <MatrixInput matrixSize={matrixSize} setMatrix={matrix => setMatrix(matrix)} />

        </div>



    );
}

export default Matrix;