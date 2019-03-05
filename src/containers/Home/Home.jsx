import React, { Component } from 'react';

import ArtistSearch from "../Artistsearch/ArtistSearch"
import queryString from 'query-string';


class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: {
        name: ""
      }
    }
  }


  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log(accessToken)
    if (!accessToken)
      return;
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      user: {
        name: data.display_name
      }
    }))
  }

  render() {
    return (
      <div className="App">
        {this.state.user.name === "" ?
          <button onClick={() => {
            window.location = window.location.href.includes('localhost') &&
              'http://localhost:8888/login' 
            }
          }
          style={{padding: '20px', 'fontSize': '50px', 'marginTop': '20px'}}>Sign in with Spotify</button> :
          <div>
            <h1 style={{ 
              'fontSize': '54px',
              'marginTop': '5px'
            }}>
              Welcome {this.state.user.name}
              <ArtistSearch />
            </h1>
          </div>
        }
      </div>
    );
  }
}


export default Home;
