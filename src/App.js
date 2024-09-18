import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom/cjs/react-router-dom.min';
import Post from './Context/PostContext';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';

import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import Create from './Pages/Create';
import ViewPost from './Pages/ViewPost';
import Input from './Input';

function App() {
  return (
    <ErrorBoundary>
      <Post>
        <Router>
          <Route exact path='/'>
            <Home />
          </Route>
          <Route exact path='/signup'>
            <Signup />
          </Route>
          <Route exact path='/login'>
            <Login />
          </Route>
          <Route exact path='/create'>
            <Create />
          </Route>
          <Route exact path='/view'>
            <ViewPost />
          </Route>
          <Route exact path='/tryout'>
            <Input />
          </Route>
        </Router>
      </Post>
    </ErrorBoundary>
  );
}

export default App;
