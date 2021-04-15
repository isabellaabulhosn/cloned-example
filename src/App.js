import React from "react";
import { csv } from "d3-fetch";

const viewWidth = 500;
const viewHeight = 500;

const App = () => {
    //fetch('https://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/weather.csv')
        //.then(response => response.json())
        //.then((data) => console.log(data))
    csv('https://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/weather.csv')
        .then((data) => console.log(data))
    return (
        <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
    );
};

export default App;