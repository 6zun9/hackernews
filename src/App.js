import React from 'react';
import { Header, ListWrapper, Story } from './views';
import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/">
      <div className="App">
        <Header />
        <Route path='/:type?' component={ListWrapper} />
        <Route path="/story/:id" component={Story} />
      </div>
    </Router>
  );
}

export default App;
