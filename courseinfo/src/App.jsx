const Header = ({course}) => {
  console.log(course)
  return <h1>{course}</h1>
}

const Part = ({name, exercises}) => {
  return <p>{name} {exercises}</p>
}

const Content = ({parts}) => {
  console.log(parts)
  return parts.map( (part,index) => <Part key={index} name = {part.name} exercises = {part.exercises}/>)
}

const Total = ({total}) => {
  return <p>Number of exercises {total}</p>
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  const {name,parts} = course
  return (
    <div>
      <Header course = {name} />
      <Content parts = {parts} />
      <Total total = {parts.reduce((accumulator,current) => accumulator + current.exercises,0)}  />
    </div>
  )
}

export default App