import { useState } from "react";

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <>
      The app is used by pressing the buttons.
      </>
    )
  }
  return (
    <>
    Button press history: {props.allClicks.join(' ')}
    </>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>      

const Display = ({value}) => <>{value}</>

const App = () => {
  /*
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })
  
  const handleLeftClicks = () =>
    setClicks({...clicks, left: clicks.left + 1})

  const handleRightClicks = () => 
    setClicks({...clicks, right: clicks.right + 1})
  */

  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  const [value, setValue] = useState(10)

  const handleLeftClicks = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(total + 1)
  }

  const handleRightClicks = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    
    setTotal(total + 1)
  }

  const setToValue = (newValue) => () => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <>
      {left}
      <Button handleClick={handleLeftClicks} text='left' />
      <Button handleClick={handleRightClicks} text='right' />
      {right}
      <br/>
      <History allClicks={allClicks} />
      <p>Total number of clicks: {total}</p>
      <Display value={value} />
      <Button handleClick={setToValue(1000)} text='thousand' />
      <Button handleClick={setToValue(0)} text='reset' />
      <Button handleClick={setToValue(value + 1)} text='increment' />
    </>
  )
}

export default App;
