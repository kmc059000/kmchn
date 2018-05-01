import * as React from 'react';
import TimeAgo from 'react-time-ago';
import { HnRestApi, IStory } from '../services/HnRestApi';

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
    return (
      <div>
        <h3>{story.title}</h3>
        {story.by} | {story.score} | <TimeAgo>{date}</TimeAgo>
      </div>
    );
  }
}

export default StoryListItem;
