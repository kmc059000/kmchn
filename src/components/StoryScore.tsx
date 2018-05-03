import * as React from 'react';
import { IStory } from '../services/HnRestApi';

const Score = ({ score }: { score: number}) => {
  const scoreClasses = score < 50 ? 'story-score' : score < 100 ? 'story-score popular' : 'story-score very-popular';
  return <div className={scoreClasses}>{score}</div>;
};

const StoryScore = ({ story }: { story: IStory}) => {
  return <Score score={story.score} />;
};

export default StoryScore;
