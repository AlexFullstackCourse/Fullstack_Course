const Hello = ({ name, age }) => {
  
  const bornYear = () => new Date().getFullYear() - age 

  return (
    <>
      <p>
        Hello {name}, you are {age} years old.
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </>
  )
}

const Footer = () => {
  return (
    <div>
      Greeting app created by <a href='https://github.com/AlexFullstackCourse'>Alex</a>
    </div>
  )
}

const App = () => {
  const friends = [
    {name: 'Peter', age: 30},
    {name: 'Maya', age: 26},
  ]
  
  return (
    <>
      <h1>Greetings</h1>
      <Hello name={friends[0].name} age={friends[0].age} />
      <Hello name={friends[1].name} age={friends[1].age} />
      <Hello name='Mike' age={26 + 10} />
      <Footer />
    </>
  )   
}

export default App;
