import * as React from 'react';
import { IStory } from '../models/Models';
import { HnRestApi } from '../services/HnRestApi';

import Pager from './Pager';
import StoryListItem from './StoryListItem';

const api = new HnRestApi();

interface IStoryHashMap {
  [key: number]: IStory,
}

interface IAppState {
  page: number,
  stories: IStoryHashMap,
  topStories : number[],
  pageSize: number,
}

class StoryList extends React.Component<any, IAppState> {
  constructor(props : any) {
    super(props);
    this.state = {
      page: 1,
      pageSize: 30,
      stories: {},
      topStories: [],
    };

    this.setPage = this.setPage.bind(this);
  }
  public async componentDidMount() {
    const results = await api.fetchTopStories();
    this.setState({
      page: 1,
      topStories: results,
    });
  }
  public getVisibleItems() {
    const { page, pageSize } = this.state;
    const start = (page - 1) * pageSize;
    return this.state.topStories.slice(start, start + 30) || [];
  }
  public setPage(page : number) {
    this.setState({
      page,
    });
  }
  public render() {
    const visibleStories = this.getVisibleItems();
    return (
      <div>
        <div className="StoryList">
          {visibleStories.map(x => <StoryListItem key={x} storyId={x} />)}
        </div>
        <Pager page={this.state.page} count={this.state.topStories.length} pageSize={this.state.pageSize} setPage={this.setPage} />
      </div>
    );
  }
}

export default StoryList;
