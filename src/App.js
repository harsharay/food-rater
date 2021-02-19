import React from "react"
import { BrowserRouter, Route, Switch } from "react-router-dom"
import './App.css';
import Login from "./Components/Login/Login";
import AddPost from "./Components/AddPost/AddPost"

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path="/" component={Login} exact/>
          <Route path="/addPost" component={AddPost} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
