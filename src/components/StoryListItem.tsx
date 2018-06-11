import * as React from 'react';
import { IStory } from '../models/Models';
import { HnService } from '../services/HnService';
import './StoryListItem.css';

import CommentLink from './CommentLink';
import StoryLink from './StoryLink';
import { StoryCommentCount, StoryScore } from './StoryScore';
import StoryTitle from './StoryTitle';
import TimeAgo from './TimeAgo';

interface IProps {
  storyId: number,
}

interface IState {
  story: IStory | null,
}

class StoryListItem extends React.Component<IProps, IState> {
  constructor(props : IProps) {
    super(props);
    this.state = {      
      story: null,
    };
    this.setStory = this.setStory.bind(this);
  }
  public async componentDidMount() {
    HnService.subscribeToStory(this.props.storyId, this.setStory);
  }
  public componentWillUnmount() {
    HnService.unsubscribeToStory(this.props.storyId, this.setStory);
  }
  public setStory(story : IStory) {
    this.setState({
      story,
    });
  }
  public render() {
    const story = this.state.story;

    return (
      <div>
        {story ? this.visibleStoryElement(story) : null}
      </div>
    );
  }

  public visibleStoryElement(story : IStory) {
    return (
      <div className="story-list-item">
        <StoryScore story={story} />
        {' '}
        <StoryCommentCount story={story} />
        {' '}
        <div className="story-title">
          <StoryTitle story={story} />
        </div>
        {' '}
        <div className="story-by">by {story.by}</div>
        {' '}
        <div className="story-time">
          <TimeAgo unixTime={story.time} />
        </div>
        {' '}
        <div className="story-link">
          <StoryLink story={story} />
          <CommentLink story={story} />
        </div>
      </div>
    );
  }
}

export default StoryListItem;
