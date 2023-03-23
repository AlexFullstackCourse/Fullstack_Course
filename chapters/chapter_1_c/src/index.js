import React from 'react';
import ReactDOM from 'react-dom/client';

import AppReRendering from './AppReRendering';

//Comment out in order to test the re-rendering below
ReactDOM.createRoot(document.getElementById('root')).render(<AppReRendering />)

//A simple but not recommended way of re-rendering the page 
/*

let counter = 1 

const refresh = () => {
    ReactDOM.createRoot(document.getElementById('root')).render(<AppReRendering counter={counter} />)
}

setInterval(() => {
    refresh()
    counter += 1
},1000)

*/