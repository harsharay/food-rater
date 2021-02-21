import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './App.css';
import Login from "./Components/Login/Login";
import AddPost from "./Components/AddPost/AddPost"
import RateDishes from "./Components/RateDishes/RateDishes";
import PollResults from "./Components/PollResults/PollResults";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
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
