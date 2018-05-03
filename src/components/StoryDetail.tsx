import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { IStory } from '../services/HnRestApi';

interface IRouterProps {
  storyId: number,
}

interface IProps extends RouteComponentProps<IRouterProps> {
  storyId: number,
}

interface IState {
  story: IStory | null,
}
class StoryDetail extends React.Component<IProps, IState> {
  constructor(props : any) {
    super(props);
    this.state = {
      story: null,
    };
  }
  public render() {
    return (
      <div className="StoryDetails">
        Hello World {this.props.match.params.storyId}
      </div>
    );
  }
}

export default StoryDetail;
