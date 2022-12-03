import { useState } from 'react';
import { Box } from './FedBack.styled';
import { Statistics } from '../Statistics/Statistics';
import { FeedbackOptions } from 'components/FeedbackOptions/FeedbackOptions ';
import { Notification } from '../Notification/Notification';
import { Section } from 'components/Section/Section';

export default function FedBack() {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const countFeedback = options => {
    return setFeedback(state => ({ ...state, [options]: state[options] + 1 }));
  };

  const countTotalFeedback = () => {
    const values = Object.values(feedback);

    let total = 0;
    for (const value of values) {
      total += value;
    }
    return total;
  };

  const countPositiveFeedbackPercentage = () => {
    const result = Number(feedback.good + feedback.neutral + feedback.bad);

    const rate = Number(((feedback.good * 100) / result).toFixed(0));
    return rate;
  };

  return (
    <Box>
      <Section title="Please leave FedBack">
        <FeedbackOptions
          options={Object.keys(feedback)}
          onLeaveFeedback={countFeedback}
        />
      </Section>
      <Section title="Statistics">
        {countTotalFeedback() ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={countTotalFeedback()}
            positivePercentage={
              countPositiveFeedbackPercentage() || 0
                ? countPositiveFeedbackPercentage()
                : 0
            }
          ></Statistics>
        ) : (
          <Notification message="There is no feedback"></Notification>
        )}
      </Section>
    </Box>
  );
}
