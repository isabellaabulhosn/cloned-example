import React from "react";
import { csv } from "d3-fetch";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin } from "d3-array";
//import { geoNaturalEath1 } from "d3-geo-projection";
//import { scale } from "vega";


const App = () => {
    //csv('https://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/weather.csv')
        //.then((data) => console.log(data))
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/weather.csv"
    );
    const dataSmallSample = data.slice(0, 5000);

    const TMAXextent = extent(dataSmallSample, (d) => {
        return +d.TMAX;
      });
        
    const size = 500;
    const margin = 20;
    const axisTextAlignmentFactor = 3;
    const maxValueOfTMAX = max([1, 2, 3]);

    const yScale = scaleLinear()
        .domain(TMAXextent) // unit: km
        .range([size - margin, size - 350]); // unit: pixels

    _bins = bin().thresholds(30);
    tmaxBins = _bins(
        data.map((d) => {
            return +d.TMAX;
        })
    );

    const histogramLeftPadding = 20;

    return (
        <div>
            <h1>Exploratory Data Analysis INFO 474 SP 2021</h1>
            <h2>Weather data</h2>
            <p>{loading && "Loading data!"}</p>
            <h3>Working with geo data</h3>
            <h3>Binning</h3>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {tmaxBins.map((bin, i) => {
                    return (
                        <rect 
                        y={size - 50 - bin.length * 0.001}
                        width="5" 
                        height={bin.length * 0.001} 
                        x={histogramLeftPadding + i * 11} />
                    );
                })}
            </svg>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {tmaxBins.map((bin, i) => {
                    return (
                        <rect 
                        y={size - 50 - bin.length * 0.001}
                        width="5" 
                        height={bin.length * 0.001} 
                        x={histogramLeftPadding + i * 11} />
                    );
                })}
            </svg>
            <h3>Scales in D3</h3>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text
                    x={size / 2 - 12}
                    y={yScale(0) + axisTextAlignmentFactor}
                    textAnchor="end"
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                    0
                </text>
                <text
                    x={size / 2 - 12}
                    y={yScale(100) + axisTextAlignmentFactor}
                    textAnchor="end"
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                    100
                </text>
                <line
                    x1={size / 2 - 10}
                    y1={yScale(100)}
                    x2={size / 2 - 5}
                    y2={yScale(100)}
                    stroke={"black"}/>
                <line
                    x1={size / 2 - 10}
                    y1={yScale(0)}
                    x2={size / 2 - 5}
                    y2={yScale(0)}
                    stroke={"black"}/>
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP";
                    return (
                        <line
                            key={index}
                            x1={size / 2}
                            y1={yScale(measurement.TMAX)}
                            x2={size / 2 + 20}
                            y2={yScale(measurement.TMAX)}
                            stroke={highlight ? "red" : "steelblue"}
                            strokeOpacity={highlight ? 1 : 0.1}/>
                    );
                })}
            </svg>
            <h3>Scatterplot</h3>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP";
                    return (
                        <circle 
                            key={index} 
                            cx={100 - measurement.TMIN} 
                            cy={size - margin - measurement.TMAX} 
                            r="3" 
                            fill="none" 
                            stroke={highlight ? "red" : "steelblue"} 
                            strokeOpacity =".2"/> 
                    );
                })}
            </svg>
            <h3>Barcode Plot: TMAX at Kalispell Glacier (sounds cold, expect it to be lower than average)</h3>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                <text 
                x={size / 2 - 15} 
                textAnchor="end"
                y={size - margin + axisTextAlignmentFactor} 
                style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                    0
                </text>
                <text 
                x={size / 2 - 15} 
                textAnchor="end"
                y={size - margin - 100 + axisTextAlignmentFactor} 
                style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                    100
                </text>
                <line 
                    x1={size / 2 - 10} 
                    y1={size - margin - 100} 
                    x2={size / 2 - 5} 
                    y2={size - margin - 100}
                    stroke={"black"} />
                <line
                    x1={size / 2 - 10}
                    y1={size - margin}
                    x2={size / 2 - 5}
                    y2={size - margin}
                    stroke={"black"}/>
                {data.slice(0, 1000).map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP";
                    return <line 
                    key={index} 
                    x1={size / 2} 
                    y1={size - margin - measurement.TMAX} 
                    x2={size / 2 + 20} 
                    y2={size - margin - measurement.TMAX}
                    stroke={highlight ? "red" : "steelblue"} 
                    strokeOpacity ={highlight ? 1 : 0.1} />
                })}
            </svg>
            <h3>Rendering circles :) this shows a distribution of TMAX</h3>
            <svg width={size} height={size} style={{ border: "1px solid black" }}>
                {dataSmallSample.map((measurement, index) => {
                    const highlight = measurement.station === "KALISPELL GLACIER AP";
                    return <circle 
                    key={index} 
                    cx={size / 2} 
                    cy={size - margin - measurement.TMAX} 
                    r="3" 
                    fill="none" 
                    stroke={"steelblue"} 
                    strokeOpacity =".2"/>
                })}
            </svg>
        </div>
    );
};

export default App;