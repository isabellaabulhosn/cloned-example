import React from "react";
import { useFetch } from "./hooks/useFetch";
import { scaleLinear } from "d3-scale";
import { extent, max, min, bin, range } from "d3-array";
//import { geoNaturalEath1 } from "d3-geo-projection";
//import { scale } from "vega";


const App = () => {
    const [data, loading] = useFetch(
        "https://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/montana.csv"
    );
    const dataSmallSample = data.slice(0, 5000);

    const TMAXextent = extent(dataSmallSample, (d) => {
        return +d.TMAX;
      });
    
    const AWNDextent = extent(data, (d) => {
        return +d.AWND;
    });

    const SNOWextent = extent(data, (d) => {
        return +d.SNOW;
    });
        
    const size = 300;
    const margin = 25;
    const axisTextAlignmentFactor = 3;
    const maxValueOfTMAX = max([1, 2, 3]);

    const yScale = scaleLinear()
        .domain(TMAXextent) // unit: km
        .range([size - margin, size - 50]); // unit: pixels

    const yScaleWind = scaleLinear()
    .domain(AWNDextent) // unit: km
    .range([size - margin, margin]); // unit: pixels

    const yScaleSnow = scaleLinear()
    .domain(SNOWextent) // unit: km
    .range([size - margin, margin]); // unit: pixels

    _bins = bin().thresholds(15);
    tmaxBins = _bins(
        data.map((d) => {
            return + d.SNWD;
        })
    );

    const histogramLeftPadding = 10;

    return (
        <div>
            <h1>Exploratory Data Analysis INFO 474 SP 2021</h1>
            <h2>Montana Weather Data</h2>
            <p>{loading && "Loading data!"}</p>
            <div id='plot1'>
                <h3>Barcode Plot: Average Daily Wind Speed (mph)</h3>
                <p>Kalispell Glacier Airport vs. Missoula Intl Airport</p>
                <svg width={size} height={size} style={{ border: "1px solid black" }}>
                    {/* left 0 */}
                    <text 
                    x={50} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* left 37 */}
                    <text 
                    x={50} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        37
                    </text>
                    {/* right 0 */}
                    <text 
                    x={size - 50} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* right 37 */}
                    <text 
                    x={size - 50 + axisTextAlignmentFactor * 4} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        37
                    </text>
                    {/* left 37 tick */}
                    <line 
                        x1={size / 4 - 5} 
                        y1={margin} 
                        x2={size / 4 - 10} 
                        y2={margin}
                        stroke={"black"} />
                    {/* left 0 tick */}
                    <line
                        x1={size / 4 - 5}
                        y1={size - margin}
                        x2={size / 4 - 10}
                        y2={size - margin}
                        stroke={"black"}/>
                    {/* right 37 tick */}
                    <line 
                        x1={size - (size / 4) + 10} 
                        y1={margin} 
                        x2={size - (size / 4) + 5} 
                        y2={margin}
                        stroke={"black"} />
                    {/* right 0 tick */}
                    <line
                        x1={size - (size / 4) + 10}
                        y1={size - margin}
                        x2={size - (size / 4) + 5}
                        y2={size - margin}
                        stroke={"black"}/>
                    {/* left label */}
                    <text 
                    x={size / 4 + 30} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Kallispell
                    </text>
                    {/* right label */}
                    <text 
                    x={size - (size / 4)} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Missoula
                    </text>
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "KALISPELL GLACIER AP";
                        return <line 
                        key={index} 
                        x1={size / 4} 
                        y1={yScaleWind(measurement.AWND)} 
                        x2={size / 4 + 30} 
                        y2={yScaleWind(measurement.AWND)}
                        stroke={highlight ? "darkorange" : "steelblue"} 
                        strokeOpacity ={highlight ? 1 : 0.1} />
                    })}
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "MISSOULA INTL AP";
                        return <line 
                        key={index} 
                        x1={size - (size / 4) - 30} 
                        y1={yScaleWind(measurement.AWND)} 
                        x2={size - (size / 4)} 
                        y2={yScaleWind(measurement.AWND)}
                        stroke={highlight ? "darkorange" : "steelblue"} 
                        strokeOpacity ={highlight ? 1 : 0.1} />
                    })}
                </svg>
                <p>I wanted to use this data to compare the Kalispell Glacier Airport and the Missoula International Airport.  These are the 2 airports I would fly into when I go to Montana, and I was wondering if I could gain some insight into which have better or worse weather which could be tied into flight times or delays.</p>
                <p><strong>Insight #1</strong>: Compared to all of the weather stations in Montana, the airport at Kalispell has average daily wind speeds mostly on the lower end.  The highest wind speeds the Kalispell airports get are around 15mph.</p>
                <p><strong>Insight #2</strong>: Compared to all of the weather stations in Montant, the airport in Missoula has fairly low average daily wind speeds, but one day had a pretty high wind speed of about 20ish mph.</p>
                <p><strong>Insight #3</strong>: In comparison to each other, it seems the Missoula airport has lower wind speeds on average, aside from a few outliers.</p>
            </div>
            <div id='plot2'>
                <h3>Barcode Plot: Average Snowfall (in)</h3>
                <p>Kalispell Glacier Airport vs. Missoula Intl Airport</p>
                <svg width={size} height={size} style={{ border: "1px solid black" }}>
                    {/* left 0 */}
                    <text 
                    x={50} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* left 11 */}
                    <text 
                    x={50} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        11
                    </text>
                    {/* right 0 */}
                    <text 
                    x={size - 50} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* right 11 */}
                    <text 
                    x={size - 50 + axisTextAlignmentFactor * 4} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        11
                    </text>
                    {/* left 100 tick */}
                    <line 
                        x1={size / 4 - 5} 
                        y1={margin} 
                        x2={size / 4 - 10} 
                        y2={margin}
                        stroke={"black"} />
                    {/* left 0 tick */}
                    <line
                        x1={size / 4 - 5}
                        y1={size - margin}
                        x2={size / 4 - 10}
                        y2={size - margin}
                        stroke={"black"}/>
                    {/* right 100 tick */}
                    <line 
                        x1={size - (size / 4) + 10} 
                        y1={margin} 
                        x2={size - (size / 4) + 5} 
                        y2={margin}
                        stroke={"black"} />
                    {/* right 0 tick */}
                    <line
                        x1={size - (size / 4) + 10}
                        y1={size - margin}
                        x2={size - (size / 4) + 5}
                        y2={size - margin}
                        stroke={"black"}/>
                    {/* left label */}
                    <text 
                    x={size / 4 + 30} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Kallispell
                    </text>
                    {/* right label */}
                    <text 
                    x={size - (size / 4)} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Missoula
                    </text>
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "KALISPELL GLACIER AP";
                        return <line 
                        key={index} 
                        x1={size / 4} 
                        y1={yScaleSnow(measurement.SNOW)} 
                        x2={size / 4 + 30} 
                        y2={yScaleSnow(measurement.SNOW)}
                        stroke={highlight ? "darkorange" : "steelblue"} 
                        strokeOpacity ={highlight ? 1 : 0.1} />
                    })}
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "MISSOULA INTL AP";
                        return <line 
                        key={index} 
                        x1={size - (size / 4) - 30} 
                        y1={yScaleSnow(measurement.SNOW)} 
                        x2={size - (size / 4)} 
                        y2={yScaleSnow(measurement.SNOW)}
                        stroke={highlight ? "darkorange" : "steelblue"} 
                        strokeOpacity ={highlight ? 1 : 0.1} />
                    })}
                </svg>
                <p>I next wanted to look at average snowfall which has impacted my flights' landing times before.</p>
                <p><strong>Insight #4</strong>: Compared to all of the weather stations in Montana, the airport at Kalispell got the highest average snowfall in a day.</p>
                <p><strong>Insight #5</strong>: Compared to all of the weather stations in Montant, the airport in Missoula seems like it gets a consistent amount of snow.  Only a few other weather stations are getting more average snowfall.</p>
                <p><strong>Insight #6</strong>: In comparison to each other, based on this data it seems like there isn't a huge difference in snowfall between the two airports, aside from the one day Kalispell got the highest snowfall.</p>
            </div>
            <div id='plot3'>
                <h3>Scatterplot: Minimum vs. Maximum Temperature (F)</h3>
                <p>Focusing on Many Glacier</p>
                <svg width={size} height={size} style={{ border: "1px solid black" }}>
                    {/* y axis */}
                    <line 
                        x1={margin * 2} 
                        y1={margin * 3} 
                        x2={margin * 2} 
                        y2={size - margin * 2}
                        stroke={"black"} />
                    {/* x axis */}
                    <line 
                        x1={margin * 2} 
                        y1={size - margin * 2} 
                        x2={size - margin * 2} 
                        y2={size - margin * 2}
                        stroke={"black"} />
                    {/* -40 */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        -40
                    </text>
                    {/* y max */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor * 2} 
                    textAnchor="end"
                    y={margin * 3 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        110
                    </text>
                    {/* x max */}
                    <text 
                    x={size - margin * 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        100
                    </text>
                    {/* x axis label */}
                    <text 
                    x={size / 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Min Temp
                    </text>
                    {/* y axis label */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size / 2} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Max Temp
                    </text>
                    {data.map((measurement, index) => {
                        if (measurement.station === "Many Glacier") {
                            return null 
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={125 + +measurement.TMIN} 
                                cy={size - margin - 75 - +measurement.TMAX} 
                                r="1" 
                                fill="rgba(27, 51, 71, .05)" 
                                stroke="none" /> 
                        );
                    })}
                    {data.map((measurement, index) => {
                        if (measurement.station !== "Many Glacier") {
                            return null
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={125 + +measurement.TMIN} 
                                cy={size - margin - 75 - +measurement.TMAX} 
                                r="1" 
                                fill="rgba(100, 0, 0, 1)" 
                                stroke="none" /> 
                        );
                    })}
                </svg>
                <p>I also wanted to look into the temperatures of two different places in Glacier National Park.  It is so big and I know the temperatures can drastically vary.</p>
                <p><strong>Insight #7</strong>: This graph was slightly hard to get the axes because the minimum temperatures weren't 0.  The ranges of TMAX was about -10 to 110.  The ranges of TMIN were about -35 to 80.</p>
                <p><strong>Insight #8</strong>: You can see Many Glacier has some of the lowest temperatures compared to the rest of Montana.  There are a few extreme outliers.</p>
            </div>
            <div id='plot4'>
                <h3>Scatterplot: Minimum vs. Maximum Temperature (F)</h3>
                <p>Focusing on Kalispell Glacier Airport</p>
                <svg width={size} height={size} style={{ border: "1px solid black" }}>
                    {/* y axis */}
                    <line 
                        x1={margin * 2} 
                        y1={margin * 3} 
                        x2={margin * 2} 
                        y2={size - margin * 2}
                        stroke={"black"} />
                    {/* x axis */}
                    <line 
                        x1={margin * 2} 
                        y1={size - margin * 2} 
                        x2={size - margin * 2} 
                        y2={size - margin * 2}
                        stroke={"black"} />
                    {/* -40 */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        -40
                    </text>
                    {/* y max */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor * 2} 
                    textAnchor="end"
                    y={margin * 3 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        110
                    </text>
                    {/* x max */}
                    <text 
                    x={size - margin * 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 10, fontFamily: "Gill Sans, sans serif" }}>
                        100
                    </text>
                    {/* x axis label */}
                    <text 
                    x={size / 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Min Temp
                    </text>
                    {/* y axis label */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size / 2} 
                    style={{ fontSize: 8, fontFamily: "Gill Sans, sans serif" }}>
                        Max Temp
                    </text>
                    {data.map((measurement, index) => {
                        if (measurement.station === "KALISPELL GLACIER AP") {
                            return null 
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={125 + +measurement.TMIN} 
                                cy={size - margin - 75 - +measurement.TMAX} 
                                r="1" 
                                fill="rgba(27, 51, 71, .05)" 
                                stroke="none" /> 
                        );
                    })}
                    {data.map((measurement, index) => {
                        if (measurement.station !== "KALISPELL GLACIER AP") {
                            return null 
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={125 + +measurement.TMIN} 
                                cy={size - margin - 75 - +measurement.TMAX} 
                                r="1" 
                                fill="rgba(100, 0, 0, 1)" 
                                stroke="none" />
                        );
                    })}
                </svg>
                <p>This time I focused on the Kalispell Glacier Airport.</p>
                <p><strong>Insight #9</strong>: I see that this weather station has a few outliers as well but less than Many Glacier.</p>
                <p><strong>Insight #10</strong>: There is a more concentrated cluster of higher temperatures than at Many Glacier.</p>
            </div>
        </div>
    );
};

export default App;