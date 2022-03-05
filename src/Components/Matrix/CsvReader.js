
import React, {useState} from 'react';
import ReactFileReader from 'react-file-reader';
import Button from "@mui/material/Button";
import {async} from "async";


function CsvReader(props) {
    const handleFiles = (files) => {
        Array.from(files).forEach(async (file) =>{
            const text = await file.text();
            console.log(text)
        })
    }


    return (
        <div>
            <br />
            <ReactFileReader fileTypes={[".csv"]} multipleFiles={false} handleFiles={handleFiles}>
                <Button className='btn btn-lg bg-light'>Upload Csv</Button>
            </ReactFileReader>
        </div>
    );
}

export default CsvReader;