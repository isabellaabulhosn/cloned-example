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
        
    const size = 500;
    const margin = 50;
    const axisTextAlignmentFactor = 6;
    const barcodeLength = 100;
    const tickLength = 8;
    const numSize = 15;
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
                    x={barcodeLength} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* left 37 */}
                    <text 
                    x={barcodeLength} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        37
                    </text>
                    {/* right 0 */}
                    <text 
                    x={size - barcodeLength + axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* right 37 */}
                    <text 
                    x={size - barcodeLength + axisTextAlignmentFactor * 3} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        37
                    </text>
                    {/* left 37 tick */}
                    <line 
                        x1={size / 4 - tickLength} 
                        y1={margin} 
                        x2={size / 4 - tickLength * 2} 
                        y2={margin}
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* left 0 tick */}
                    <line
                        x1={size / 4 - tickLength}
                        y1={size - margin}
                        x2={size / 4 - tickLength * 2}
                        y2={size - margin}
                        stroke={"black"} 
                        stroke-width= {"3"} />
                    {/* right 37 tick */}
                    <line 
                        x1={size - (size / 4) + tickLength * 2} 
                        y1={margin} 
                        x2={size - (size / 4) + tickLength} 
                        y2={margin}
                        stroke={"black"} 
                        stroke-width= {"3"} />
                    {/* right 0 tick */}
                    <line
                        x1={size - (size / 4) + tickLength * 2}
                        y1={size - margin}
                        x2={size - (size / 4) + tickLength}
                        y2={size - margin}
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* left label */}
                    <text 
                    x={size / 3 + margin / 2} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 18, fontFamily: "Gill Sans, sans serif" }}>
                        Kallispell
                    </text>
                    {/* right label */}
                    <text 
                    x={size - (size / 4) - margin / 2} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 18, fontFamily: "Gill Sans, sans serif" }}>
                        Missoula
                    </text>
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "KALISPELL GLACIER AP";
                        return <line 
                        key={index} 
                        x1={size / 4} 
                        y1={yScaleWind(measurement.AWND)} 
                        x2={size / 4 + barcodeLength} 
                        y2={yScaleWind(measurement.AWND)}
                        stroke={highlight ? "darkorange" : "steelblue"} 
                        strokeOpacity ={highlight ? 1 : 0.1} />
                    })}
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "MISSOULA INTL AP";
                        return <line 
                        key={index} 
                        x1={size - (size / 4) - barcodeLength} 
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
                    x={barcodeLength} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* left 37 */}
                    <text 
                    x={barcodeLength} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        37
                    </text>
                    {/* right 0 */}
                    <text 
                    x={size - barcodeLength + axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size - margin + axisTextAlignmentFactor} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        0
                    </text>
                    {/* right 37 */}
                    <text 
                    x={size - barcodeLength + axisTextAlignmentFactor * 3} 
                    textAnchor="end"
                    y={margin + axisTextAlignmentFactor / 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        37
                    </text>
                    {/* left 37 tick */}
                    <line 
                        x1={size / 4 - tickLength} 
                        y1={margin} 
                        x2={size / 4 - tickLength * 2} 
                        y2={margin}
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* left 0 tick */}
                    <line
                        x1={size / 4 - tickLength}
                        y1={size - margin}
                        x2={size / 4 - tickLength * 2}
                        y2={size - margin}
                        stroke={"black"} 
                        stroke-width= {"3"} />
                    {/* right 37 tick */}
                    <line 
                        x1={size - (size / 4) + tickLength * 2} 
                        y1={margin} 
                        x2={size - (size / 4) + tickLength} 
                        y2={margin}
                        stroke={"black"} 
                        stroke-width= {"3"} />
                    {/* right 0 tick */}
                    <line
                        x1={size - (size / 4) + tickLength * 2}
                        y1={size - margin}
                        x2={size - (size / 4) + tickLength}
                        y2={size - margin}
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* left label */}
                    <text 
                    x={size / 3 + margin / 2} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 18, fontFamily: "Gill Sans, sans serif" }}>
                        Kallispell
                    </text>
                    {/* right label */}
                    <text 
                    x={size - (size / 4) - margin / 2} 
                    textAnchor="end"
                    y={size - margin / 2.5} 
                    style={{ fontSize: 18, fontFamily: "Gill Sans, sans serif" }}>
                        Missoula
                    </text>
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "KALISPELL GLACIER AP";
                        return <line 
                        key={index} 
                        x1={size / 4} 
                        y1={yScaleSnow(measurement.SNOW)} 
                        x2={size / 4 + barcodeLength} 
                        y2={yScaleSnow(measurement.SNOW)}
                        stroke={highlight ? "darkorange" : "steelblue"} 
                        strokeOpacity ={highlight ? 1 : 0.1} />
                    })}
                    {data.map((measurement, index) => {
                        const highlight = measurement.station === "MISSOULA INTL AP";
                        return <line 
                        key={index} 
                        x1={size - (size / 4) - barcodeLength} 
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
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* x axis */}
                    <line 
                        x1={margin * 2} 
                        y1={size - margin * 2} 
                        x2={size - margin * 2} 
                        y2={size - margin * 2}
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* -40 */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        -40
                    </text>
                    {/* y max */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor * 2} 
                    textAnchor="end"
                    y={margin * 3 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        110
                    </text>
                    {/* x max */}
                    <text 
                    x={size - margin * 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        100
                    </text>
                    {/* x axis label */}
                    <text 
                    x={size / 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}>
                        Min Temp
                    </text>
                    {/* y axis label */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size / 2} 
                    style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}>
                        Max Temp
                    </text>
                    {data.map((measurement, index) => {
                        if (measurement.station === "Many Glacier") {
                            return null 
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={250 + +measurement.TMIN} 
                                cy={size - margin - 150 - +measurement.TMAX} 
                                r="1" 
                                fill="rgba(176, 196, 222, .15)" 
                                stroke="lightsteelblue"
                                stroke-opacity="0.2" /> 
                        );
                    })}
                    {data.map((measurement, index) => {
                        if (measurement.station !== "Many Glacier") {
                            return null
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={250 + +measurement.TMIN} 
                                cy={size - margin - 150 - +measurement.TMAX} 
                                r="1.5" 
                                fill="rgba(255, 165, 0, .85)" 
                                stroke="darkorange"
                                stroke-opacity="0.2"  /> 
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
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* x axis */}
                    <line 
                        x1={margin * 2} 
                        y1={size - margin * 2} 
                        x2={size - margin * 2} 
                        y2={size - margin * 2}
                        stroke={"black"}
                        stroke-width= {"3"} />
                    {/* -40 */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        -40
                    </text>
                    {/* y max */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor * 2} 
                    textAnchor="end"
                    y={margin * 3 + axisTextAlignmentFactor * 2} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        110
                    </text>
                    {/* x max */}
                    <text 
                    x={size - margin * 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 15, fontFamily: "Gill Sans, sans serif" }}>
                        100
                    </text>
                    {/* x axis label */}
                    <text 
                    x={size / 2} 
                    textAnchor="end"
                    y={size - margin * 2 + axisTextAlignmentFactor * 4} 
                    style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}>
                        Min Temp
                    </text>
                    {/* y axis label */}
                    <text 
                    x={margin * 2 - axisTextAlignmentFactor} 
                    textAnchor="end"
                    y={size / 2} 
                    style={{ fontSize: 12, fontFamily: "Gill Sans, sans serif" }}>
                        Max Temp
                    </text>
                    {data.map((measurement, index) => {
                        if (measurement.station === "KALISPELL GLACIER AP") {
                            return null 
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={250 + +measurement.TMIN} 
                                cy={size - margin - 150 - +measurement.TMAX} 
                                r="1" 
                                fill="rgba(176, 196, 222, .15)" 
                                stroke="lightsteelblue"
                                stroke-opacity="0.2" /> 
                        );
                    })}
                    {data.map((measurement, index) => {
                        if (measurement.station !== "KALISPELL GLACIER AP") {
                            return null 
                        }
                        return (
                            <circle 
                                key={index} 
                                cx={250 + +measurement.TMIN} 
                                cy={size - margin - 150 - +measurement.TMAX} 
                                r="1.5" 
                                fill="rgba(255, 165, 0, .85)" 
                                stroke="darkorange"
                                stroke-opacity="0.2" />
                        );
                    })}
                </svg>
                <p>This time I focused on the Kalispell Glacier Airport.</p>
                <p><strong>Insight #9</strong>: I see that this weather station has a few outliers as well but less than Many Glacier.</p>
                <p><strong>Insight #10</strong>: There is a more concentrated cluster of higher temperatures than at Many Glacier.</p>
            </div>
            <div>
                <h2>Write-up</h2>
                <p>I chose to work with the weather dataset, which contains daily U.S. weather measurements from 2017.  The data has been pre transformed, in the sense that some weather stations were filtered out if the measurements were too sparse.  In this dataset, there are 416,937 rows and 15 different columns.  The columns are: station (which is the name of the weather station), state, latitude, longitude, elevation, date, TMIN (minimum temp in F), TMAX (maximum temp in F), TAVG (average temp in F), AWND (average daily wind speed in mph), WDF5 (direction of fastest 5-second wind in degrees), WSF5 (fastest 5-second wind speed in mph), SNOW (snowfall in inches), SNWD (snow depth in inches), and PRCP (precipitation in inches).  Immediately, I notice that there are some NaN values in the dataset.</p>
                <p>Because this weather dataset had hundreds of thousands of rows, I decided to narrow it down to just Montana.  The initial reason I was trying to make my dataset smaller was because it was taking too long to load on the website as I was creating my visuals.  But this was also a way to cut down the dataset in a beneficial and meaningful way.  I decided to explore 3 questions in this assignment.  First, I broadly wanted to explore throughout all of my visualizations how the weather measurements differ in Montana.  I next wanted to look at how the weather differs at different airports, specifically the Kalispell Glacier Airport and the Missoula International Airport.  These are the two airports I fly into when I visit my grandparents in Montana, and I thought it would be interesting to compare the weather at the two and see if I could draw any conclusions about which airport is more likely to have weather related delays.  I chose to look at the daily average wind speed (AWND) and average snowfall (SNOW) because I felt like those 2 factors were likely to impact a plane’s travel.  I chose to do two side by side barcode plots.  This not only allowed me to compare the two airports to each other, I was also able to compare each individual airport to the rest of the weather stations throughout the state.  I thought that was really beneficial and effective for me to draw conclusions.  For my final question, I wanted to look at how temperatures differ across the two weather stations in Glacier National Park.  I have been there and it is a huge park, and so interesting that the weather can fluctuate so much in different parts of the same park.  To do this, I made scatter plots of two of the Glacier National Park weather stations.  Similarly to my other visualizations, I chose to use color to separate the weather station I was focusing on from all the other weather stations in Montana.  This way, I was able to compare the two stations in Glacier, while also being able to compare them to the rest of the state.</p>
                <p>While completing this project, I learned a lot about the process and about the code in general.  One of the biggest learning curves was choosing the x and y points.  It took me a while to finally understand how to effectively place things.  Creating the labels and tick marks was more time consuming because I had to make sure everything lined up well.  I also found that it can be helpful to narrow down your dataset if it can provide opportunity for a more focused analysis.  I learned that color can be an effective medium to allow for a multi-layer analysis of the same visualization.  I also learned that using contrasting colors is important which I tried to do.</p>
                <h2>Peer Feedback</h2>
                <li>Instead of using color in the Barcode plots, shift the highlighted bars over to see them better</li>
                <li>Make graphs bigger</li>
                <li>Change contrast on scatterplot</li>
                <h2>Implemented Feedback</h2>
                <p>I decided to make all of my graphs bigger.  I agreed with my feedback in that it would make the graphs easier to see and read.  I had to fix my scaling on everything which was tedious becuase a lot of my labels and tick marks were hard coded in to fit my old scaling.  I also noticed I should make some lines thicker to make them easier to see since everything was bigger now.  I also changed my contrast of colors on my scatterplot so the highlighted ones could stand out better.</p>
            </div>
        </div>
    );
};

export default App;