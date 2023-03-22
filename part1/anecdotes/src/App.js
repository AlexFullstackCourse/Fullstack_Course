import { useState } from "react";

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const DisplayVotes = ({votes, selected}) => <div>{'['}has {votes[selected]} votes{']'}</div>

//global variable that stores the index of the last selected anecdote. Initialised with zero
//because the initial state of 'selected' is zero as well
let lastSelected = 0

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(8).fill(0))

  //Function to generate a new random number between 0 and 7 that is not the same as the old one
  const randomNumberGenerator = (oldRandomNumber) => {
    let randomNumber = Math.floor(Math.random() * 8)
    while(oldRandomNumber === randomNumber){
      randomNumber = Math.floor(Math.random() * 8)
    }
    return randomNumber
  }

  //Function to handle a click on the Next anecdote button. A new anecdote is selected by 
  //evoking randomNumberGenerator and setting 'selected' to the new index returned
  const handleNextAnecdoteClick = () => {
    let newSelected = randomNumberGenerator(lastSelected)
    setSelected(newSelected)
    lastSelected = newSelected
  }

  //Function to handle a click on the vote button. A copy of votes is created the 
  //number of votes of the selected anecdotes is incremented. After that the copy is stored to the component state
  const handleVoteClick = () => {
    const newVote = [...votes]
    newVote[selected] += 1
    //console.log(newVote)
    setVotes(newVote)
  }

  //Variable that stores the index of the anecdote with the most votes 
  let mostVotes = 0

  //finding the index of the most voted anecdote with a simple for loop 
  for (let i = 0; i < votes.length; i++){
    if (votes[mostVotes] < votes[i]) {
      mostVotes = i
    }
  }

  return (
    <>
      <h1>Anecdote of the Day</h1>
      {anecdotes[selected]}
      <br/>
      <DisplayVotes votes={votes} selected={selected} /> 
      <br/>
      <Button handleClick={handleVoteClick} text='Vote' /> 
      <Button handleClick={handleNextAnecdoteClick} text='Next anecdote' />
      <h1>Anecdote With the Most Votes</h1>
      {anecdotes[mostVotes]}
      <div>{'['}has {votes[mostVotes]} votes{']'}</div>
    </>
  )
}

export default App;
