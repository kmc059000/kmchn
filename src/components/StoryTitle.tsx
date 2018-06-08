import * as React from 'react';
import { Link } from 'react-router-dom';
import { IStory } from '../models/Models';

const StoryTitle = ({ story }: { story: IStory}) => {
  return <Link to={`/story/${story.id}`} title={story.title}>{story.title}</Link>;
};

export default StoryTitle;
