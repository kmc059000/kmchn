import * as React from 'react';
import {
  HashRouter as Router,
  Route
} from 'react-router-dom';

import './App.css';

import StoryDetail from './components/StoryDetail';
import StoryList from './components/StoryList';

class App extends React.Component<any, any> {
  constructor(props : any) {
    super(props);
  }
  public render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <h1 className="App-title">hn clone</h1>
          </header>
          <Route exact={true} path="/" component={StoryList} />
          <Route path="/story/:storyId" component={StoryDetail} />
        </div>
      </Router>
    );
  }
}

export default App;
