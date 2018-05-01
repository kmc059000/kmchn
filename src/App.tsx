import * as React from 'react';
import './App.css';
import HnRestApi from './services/HnRestApi';
const api = new HnRestApi();

interface IAppState {
  topStories : number[],
}

class App extends React.Component<any, IAppState> {
  constructor(props : any) {
    super(props);
    this.state = {
      topStories: [],
    };
  }
  public async componentDidMount() {
    const results = await api.fetchTopStories();
    this.setState({
      ...this.state,
      topStories: results,
    });
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">hn clone</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload. Hello world
          {this.state.topStories.map(x => <div key={x}>{x}</div>)}
        </p>
      </div>
    );
  }
}

export default App;
