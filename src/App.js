import React from "react";
import { csv } from "d3-fetch";
import { useFetch } from "./hooks/useFetch";

const viewWidth = 500;
const viewHeight = 500;

const App = () => {
    //csv('https://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/weather.csv')
        //.then((data) => console.log(data))
    const [data, loading] = useFetch(
        "ttps://raw.githubusercontent.com/isabellaabulhosn/cloned-example/main/weather.csv"
    );
    console.log("from hook", loading, data);
    return (
        <div>
            <h1>Exploratory Data Analysis, Assignment 2, INFO 474 SP 2021</h1>
            <p>{loading && "Loading data!"}</p>
        </div>
    );
};

export default App;