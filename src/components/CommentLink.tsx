import * as React from 'react';
import { IStory } from '../models/Models';

const CommentLink = ({ story }: { story: IStory}) => {
  return <a href={`https://news.ycombinator.com/item?id=${story.id}`} target="blank">[Comments]</a>
};

export default CommentLink;
