import * as React from 'react';
import './App.css';

import StoryList from './components/StoryList';

class App extends React.Component<any, any> {
  constructor(props : any) {
    super(props);
  }
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">hn clone</h1>
        </header>
        <StoryList />
      </div>
    );
  }
}

export default App;
