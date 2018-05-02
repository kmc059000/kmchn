import * as React from 'react';
import { TimeAgo } from 'react-time-ago';
import { HnRestApi, IStory } from '../services/HnRestApi';
import './StoryListItem.css';

const api = new HnRestApi();

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
  }
  public async componentDidMount() {
    const story = await api.fetchStory(this.props.storyId);
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
    const date = new Date(story.time * 1000);
    const scoreClasses = story.score < 50 ? 'story-score' : story.score < 100 ? 'story-score popular' : 'story-score very-popular';

    const storyLink = story.url ? (<a href={story.url} target="blank">[Link]</a>) : null

    return (
      <div className="story-list-item">
        <div className={scoreClasses}>{story.score}</div>
        {' '}
        <div className="story-title" title={story.title}>
          {story.title}
        </div>
        {' '}
        <div className="story-by">by {story.by}</div>
        {' '}
        <div className="story-time"><TimeAgo>{date}</TimeAgo></div>
        {' '}
        <div className="story-link">
          {storyLink}
        </div>
      </div>
    );
  }
}

export default StoryListItem;
