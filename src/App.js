import React from "react"
import { BrowserRouter, Link, Route, Switch } from "react-router-dom"
import './App.css';
import Login from "./Components/Login/Login";
import AddPost from "./Components/AddPost/AddPost"
import RateDishes from "./Components/RateDishes/RateDishes";
import PollResults from "./Components/PollResults/PollResults";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="nav-links">
          <Link to="/">Login</Link>
          <Link to="/addPost">AddPost</Link>
          <Link to="/rateDishes">Rate posts</Link>
          <Link to="/results">View results</Link>
        </div>
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/addPost" component={AddPost} exact/>
          <Route path="/rateDishes" component={RateDishes} exact/>
          <Route path="/results" component={PollResults} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
