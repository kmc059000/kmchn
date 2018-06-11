import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { TimeAgo } from 'react-time-ago';
import { IStory } from '../models/Models';
import { HnRestApi } from '../services/HnRestApi';

import './StoryDetail.css';

import Comment from './Comment';
import CommentLink from './CommentLink';
import ItemText from './ItemText';
import StoryLink from './StoryLink';
import { StoryCommentCount, StoryScore } from './StoryScore';
import StoryTitle from './StoryTitle';

interface IRouterProps {
  storyId: number,
}

interface IProps extends RouteComponentProps<IRouterProps> {
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
        <div>
          <StoryScore story={story} />
          {' '}
          <StoryCommentCount story={story} />
          {' '}
          <div className="StoryTitle">
            <StoryTitle story={story} />
          </div>
          {' '}
          <div className="StoryBy">by {story.by}</div>
          {' '}
          <div className="StoryTime"><TimeAgo>{date}</TimeAgo></div>
          {' '}
          <div className="StoryLink">
            <StoryLink story={story} />
            <CommentLink story={story} />
        </div>
      </div>
      <div className="StoryText">
        <ItemText text={story.text}/>
      </div>
      <div>
        {(story.kids || []).map(x => <Comment commentId={x} key={x} />)}
      </div>
    </div>
    ); 
  }
}

export default StoryDetail;
