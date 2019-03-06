import React, { Component } from "react";
import queryString from "query-string";

import ArtistSearch from "../Artistsearch/ArtistSearch";


class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: ""
      }
    };
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }));
  };

  render() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    let userArrayName = [];
    let userFirstName = "";
    if(this.state.user.name !== "") userArrayName = this.state.user.name.split(" ");
    if(userArrayName.lenght !== 0) userFirstName = userArrayName[0];
    return (
      <div className="App" style={{ textAlign: "center" }}>
        {this.state.user.name === "" ?
          <div style={{ fontSize: 20  }}>
            <div style={{ marginTop: 50, marginBottom: 10  }}>Welcome to my technical assignment for TouchTunes</div>
            <div style={{ marginBottom: 50 }}>To go further, you need to connect to your Spotify account</div>
            <button onClick={() => {
              window.location = window.location.href.includes('localhost') &&
                'http://localhost:8888/login' 
            }}>
              Sign in with Spotify
            </button>
          </div>
           :
          <div>
            <h1 style={{ 
              'fontSize': 20,
              'margin': 50
            }}>
              Hi {userFirstName}
            </h1>
            <ArtistSearch accessToken={accessToken}/>
          </div>
        }
      </div>
    );
  };
};


export default Home;
