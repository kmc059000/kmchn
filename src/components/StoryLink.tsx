import * as React from 'react';
import { IStory } from '../models/Models';

const StoryLink = ({ story }: { story: IStory}) => {
  return story.url ? (<a href={story.url} target="blank">[Link]</a>) : null;
};

export default StoryLink;
