import * as React from 'react';
import './App.css';
import { HnRestApi, IStory } from './services/HnRestApi';

import StoryListItem from './components/StoryListItem';

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

class App extends React.Component<any, IAppState> {
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
      visibleStoryIds: results.slice(0, 20),
    });
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">hn clone</h1>
        </header>
        {this.state.visibleStoryIds.map(x => <StoryListItem key={x} storyId={x} />)}
      </div>
    );
  }
}

export default App;
