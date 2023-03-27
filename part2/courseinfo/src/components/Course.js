const Header = ({ courseTitle }) => {
  return (
    <>
      <h2>{courseTitle}</h2>
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

const Total = ({ parts }) => {
  const total = parts.reduce(
    (sum, currentValue) => sum + currentValue.exercises,
    0
  );

  return (
    <>
      <p>
        <b>Total of {total} exercises</b>
      </p>
    </>
  );
};

const Course = ({ course }) => {
  return (
    <>
      <Header courseTitle={course.name} />
      <Content parts={course.parts} />
      {<Total parts={course.parts} />}
    </>
  );
};

export default Course;
