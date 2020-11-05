import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}

interface ContentProps {
  courseParts: CoursePart[];
}

interface TotalProps {
  courseParts: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartOne extends CoursePartBase2 {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartBase2 {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartBase2 {
  name: "Custom name";
}

interface CoursePartBase2 extends CoursePartBase {
  description: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const Header: React.FC<HeaderProps> = props => {
  return <h1>{props.courseName}</h1>
}

const Content: React.FC<ContentProps> = props => {
  return (
    <div>
      {props.courseParts.map((part, i) => {
        switch (part.name) {
          case "Fundamentals":
            return <p key={i}>{part.name} {part.exerciseCount} {part.description}</p>
          case "Using props to pass data":
            return <p key={i}>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>
          case "Deeper type usage":
            return <p key={i}>{part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}</p>
          case "Custom name":
            return <p key={i}>{part.name} {part.exerciseCount} {part.description}</p>
          default:
            break;
        }
      })}
    </div>
  )
}

const Total: React.FC<TotalProps> = props => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </div>
  )
}
const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div >
  );
};

ReactDOM.render(<App />, document.getElementById("root"));