import React from 'react';

const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({ feedback }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Feedback</th>
          <th>Value</th>
        </tr>
      </thead>
      <tbody>
        <StatisticLine text="good" value={feedback.good} />
        <StatisticLine text="neutral" value={feedback.neutral} />
        <StatisticLine text="bad" value={feedback.bad} />
        <StatisticLine text="all" value={feedback.all} />
        <StatisticLine text="average" value={feedback.average.toFixed(2)} />
        <StatisticLine text="positive" value={`${feedback.positive.toFixed(2)} %`} />
      </tbody>
    </table>
  );
};

const Button = ({ onClick, text }) => (
  <button onClick={() => onClick(text)}>{text}</button>
);

const calculateStatistics = (prev, type) => {
  const score = type === 'good' ? 1 : (type === 'bad' ? -1 : 0);

  const updatedFeedback = {
    ...prev,
    [type]: prev[type] + 1,
    all: prev.all + 1,
    average: (prev.average * prev.all + score) / (prev.all + 1),
    positive: ((prev.good + (type === 'good' ? 1 : 0)) / (prev.all + 1)) * 100,
  };

  return updatedFeedback;
};

const App = () => {
  const [feedback, setFeedback] = React.useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  const handleFeedbackClick = (type) => {
    setFeedback((prev) => calculateStatistics(prev, type));
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleFeedbackClick} text="good" />
      <Button onClick={handleFeedbackClick} text="neutral" />
      <Button onClick={handleFeedbackClick} text="bad" />

      <h1>statistics</h1>
      {feedback.all > 0 ? <Statistics feedback={feedback} /> : <p>No feedback given</p>}
    </div>
  );
};

export default App;
