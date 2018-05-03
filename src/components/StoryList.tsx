import * as React from 'react';
import { HnRestApi, IStory } from '../services/HnRestApi';

import StoryListItem from './StoryListItem';

const api = new HnRestApi();

interface IStoryHashMap {
  [key: number]: IStory,
}

interface IAppState {
  page: number,
  stories: IStoryHashMap,
  topStories : number[],
  visibleStoryIds: number[],
}

class StoryList extends React.Component<any, IAppState> {
  constructor(props : any) {
    super(props);
    this.state = {
      page: 1,
      stories: {},
      topStories: [],
      visibleStoryIds: [],
    };
  }
  public async componentDidMount() {
    const results = await api.fetchTopStories();
    this.setState({
      page: 1,
      topStories: results,
      visibleStoryIds: results.slice(0, 30),
    });
  }
  public render() {
    return (
      <div className="StoryList">
        {this.state.visibleStoryIds.map(x => <StoryListItem key={x} storyId={x} />)}
      </div>
    );
  }
}

export default StoryList;
