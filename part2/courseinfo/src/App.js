const Course = ({ course }) => {
  return (
    <>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      {/*<Total parts={course.parts} />*/}
    </>
  );
};

const Header = ({ courseTitle }) => {
  return (
    <>
      <h1>{courseTitle}</h1>
    </>
  );
};

const Part = ({ partName, exercises }) => {
  return (
    <>
      <p>
        {partName} {exercises}
      </p>
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((part) => (
        <Part key={part.id} partName={part.name} exercises={part.exercises} />
      ))}
    </>
  );
};
/*
const Total = ({ parts }) => {
  return (
    <>
      <p>
        <b>
          Total of{" "}
          {parts[0].exercises + parts[1].exercises + parts[2].exercises}{" "}
          exercises
        </b>
      </p>
    </>
  );
};
*/
const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
