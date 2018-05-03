import * as React from 'react';
// import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router-dom';
import { HnRestApi, IStory } from '../services/HnRestApi';

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
    const story = await api.fetchStory(this.props.storyId);
    this.setState({
      story,
    });
  }
  public render() {
    return (
      <div className="StoryDetails">
          {/* <div className="story-title" title={story.title}>
            <Link to={`/story/${story.id}`}>{story.title}</Link>
          </div> */}
      </div>
    );
  }
}

export default StoryDetail;
