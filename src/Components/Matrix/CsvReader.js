
import React, {useState} from 'react';
import ReactFileReader from 'react-file-reader';
import Papa  from 'papaparse';


function CsvReader(props) {
    const handleFiles = (files) => {
        Array.from(files).forEach(async (file) =>{
            const text = await file.text();
            const result = Papa.parse(text)
            console.log(result)
        })
    }


    return (
            <ReactFileReader fileTypes={[".csv"]} multipleFiles={false} handleFiles={handleFiles}>
                <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-4">
                    Upload Csv
                    </button>
            </ReactFileReader>
    );
}

export default CsvReader;