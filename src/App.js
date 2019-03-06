import React, { Component } from 'react';

import { Router, Route, Switch } from "react-router-dom";
import Home from "./containers/Home/Home"
import ArtistAlbums from "./containers/ArtistAlbums/ArtistAlbums"


import createBrowserHistory from 'history/createBrowserHistory';
const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <div>
        <div className="main-title" style={{ height: 70, width: "100%", position: "fixed", backgroundColor: "#10ac84", color: "white", zIndex: 10 }}>Spotify Artists Search</div>
        <Router history={history}>
          <div className="App" style={{ paddingTop: 70 }}>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/artists/:id/:accessToken' component={ArtistAlbums} />

              <Route
              component={() => (
                <div style={{ textAlign: "center" }}>
                  <div style={{ margin: 40 }}>NOT FOUND</div>
                  <img alt="" src="" />
                </div>
              )}
            />

            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
