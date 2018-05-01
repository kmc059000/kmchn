import * as React from 'react';
import './App.css';
import { fetchTopStories } from './'

class App extends React.Component {
  public componentDidMount() {

  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">hn clone</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload. Hello world
        </p>
      </div>
    );
  }
}

export default App;
