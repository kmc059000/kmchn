import * as React from 'react';
import { IStory } from '../services/HnRestApi';

const StoryLink = ({ story }: { story: IStory}) => {
  return story.url ? (<a href={story.url} target="blank">[Link]</a>) : null;
};

export default StoryLink;
