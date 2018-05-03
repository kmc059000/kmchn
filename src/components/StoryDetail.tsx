import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TimeAgo } from 'react-time-ago';
import { HnRestApi, IStory } from '../services/HnRestApi';

import CommentLink from './CommentLink';
import StoryLink from './StoryLink';
import StoryScore from './StoryScore';
import StoryTitle from './StoryTitle';

interface IRouterProps {
  storyId: number,
}

interface IProps extends RouteComponentProps<IRouterProps> {
  storyId: number,
}

interface IState {
  story: IStory | null,
}

const api = new HnRestApi();

class StoryDetail extends React.Component<IProps, IState> {
  constructor(props : any) {
    super(props);
    this.state = {
      story: null,
    };
  }
  public async componentDidMount() {
    const story = await api.fetchStory(this.props.match.params.storyId);
    this.setState({
      story,
    });
  }
  public render() {
    const story = this.state.story;
    if(!story) {
      return '';
    }

    const date = new Date(story.time * 1000);
    return (
      <div className="StoryDetails">
      
         <StoryScore story={story} />
          {' '}
          <div className="story-title">
            <StoryTitle story={story} />
          </div>
          {' '}
          <div className="story-by">by {story.by}</div>
          {' '}
          <div className="story-time"><TimeAgo>{date}</TimeAgo></div>
          {' '}
          <div className="story-link">
            <StoryLink story={story} />
            <CommentLink story={story} />
        </div>
      </div>
    ); 
  }
}

export default StoryDetail;
