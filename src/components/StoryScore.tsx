import * as React from 'react';
import { IStory } from '../models/Models';

const fromColor = 'EB1919';
const toColor = '000000';

function calculateColor(ratio : number) {
  function hex(x : number) {
      const xStr = x.toString(16);
      return (xStr.length === 1) ? `0${xStr}` : xStr;
  };

  const r = Math.ceil(parseInt(fromColor.substring(0,2), 16) * ratio + parseInt(toColor.substring(0,2), 16) * (1-ratio));
  const g = Math.ceil(parseInt(fromColor.substring(2,4), 16) * ratio + parseInt(toColor.substring(2,4), 16) * (1-ratio));
  const b = Math.ceil(parseInt(fromColor.substring(4,6), 16) * ratio + parseInt(toColor.substring(4,6), 16) * (1-ratio));

  return hex(r) + hex(g) + hex(b);
}


const Score = ({ score, showColor }: { score: number, showColor: boolean}) => {
  const denom = 500;
  const threshold = 50;
  const power = 0.4;

  const ratio = Math.max(0, Math.min(1, (Math.max(0, score - threshold) / denom) ** power));
  const color = showColor ? calculateColor(ratio) : '';

  return <div className={"StoryScore"} style={ { color: `#${color}` }}>{score}</div>;
};

export const StoryScore = ({ story }: { story: IStory}) => {
  return <Score score={story.score} showColor={true} />;
};

export const StoryCommentCount = ({ story }: { story: IStory}) => {
  return <Score score={story.descendants} showColor={false} />;
};
