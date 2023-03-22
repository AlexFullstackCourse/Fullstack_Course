import { useState } from "react";

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticLine = ({value, front_text, back_text}) => {
  return (
    <tr>
      <td>{front_text}</td>
      <td>{value}{back_text}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad, total}) => {

  return (
    <table>
      <tbody>
        <StatisticLine value={good} front_text='Good: ' />
        <StatisticLine value={neutral} front_text='Neutral: ' />
        <StatisticLine value={bad} front_text='Bad: ' /> 
        <StatisticLine value={total} front_text='All: ' />
        <StatisticLine value={(good - bad)/total} front_text='Average feedback: ' />
        <StatisticLine value={(good/total)*100} front_text='Positive feedback: ' back_text=' %' />
      </tbody>
    </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  const handleGoodClick = () => {
    //console.log('clicked good', good + 1)
    setGood(good + 1)
    setTotal(total + 1)
  }

  const handleNeutralClick = () => {
    //console.log('clicked neutral', neutral + 1)
    setNeutral(neutral + 1)
    setTotal(total + 1)
  }

  const handleBadClick = () => {
    //console.log('clicked bad', bad + 1)
    setBad(bad + 1)
    setTotal(total + 1)
  }

  if(total === 0){
    return (
      <>
        <h1>Give feedback:</h1>
        <Button handleClick={handleGoodClick} text='Good' />
        <Button handleClick={handleNeutralClick} text='Neutral' />
        <Button handleClick={handleBadClick} text='Bad' />
        <h1>Statistics:</h1>
        <div>No feedback given</div>
      </>
    )
  }
  return (
    <>
      <h1>Give feedback:</h1>
      <Button handleClick={handleGoodClick} text='Good' />
      <Button handleClick={handleNeutralClick} text='Neutral' />
      <Button handleClick={handleBadClick} text='Bad' />
      <h1>Statistics:</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </>
  )  
}

export default App;
