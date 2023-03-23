import { useState } from 'react'

//Section 1: Re-rendering the page in a simple but not recommended way 
/*
const AppReRendering = (props) => {
    const {counter} = props

    return (
        <>{counter}</>
    )
}*/

//Section 2: A more reasonable way of re-rendering the page and use of an event handler

const Display = ({counter}) => <>{counter}</>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>        

const AppReRendering = () => {
    const [ counter, setCounter ] = useState(0)
    
    //automatic re-rendering after one second
    /*
    setTimeout(
        () => setCounter(counter + 1),
        1000
    )*/
    
    //use of a simple event handler to only re-render afer the button is pushed
    const increaseByOne = () => setCounter(counter + 1)
    const decreaseByOne = () => setCounter(counter - 1)
    const setToZero = () => setCounter(0)
    

    return (
        <>  
            <Display counter={counter} />
            <Button 
                handleClick={increaseByOne} 
                text='plus' 
            />
            <Button 
                handleClick={setToZero}
                text='zero'
            /> 
            <Button 
                handleClick={decreaseByOne}
                text='minus'
            />
        </>
    )
}

export default AppReRendering 