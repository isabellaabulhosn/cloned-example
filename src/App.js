import React from "react";

const viewWidth = 500;
const viewHeight = 500;

const App = () => {
    return (
        <svg style={{border: "1px solid lightgrey", width: viewWidth, height: viewHeight}}>
            <circle cx={20} cy={20} r="5"></circle>
            <rect x={200} y={200} width={10} height={10}></rect>
            <rect x={212} y={200} width={10} height={10}></rect>
            <rect x={224} y={200} width={10} height={10}></rect>
            <rect x={236} y={200} width={10} height={10}></rect>
            <rect x={248} y={200} width={10} height={10}></rect>
        </svg>
    );
};

export default App;