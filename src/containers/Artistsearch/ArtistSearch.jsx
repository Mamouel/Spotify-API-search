import React, { Component } from "react";
import queryString from 'query-string';


import Card from "./components/Card";
import SearchField from "./components/SearchField"

class ArtistSearch extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      searchTerm : "",
      currentDisplay: []
    }
  }

  performSearch = (searchTerm) => {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken) return;
    if (this.state.searchTerm === "") return;
    if(searchTerm === "") return;
    fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=artist`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      currentDisplay: data,
      isLoading: true,
    }))

  }

  handleInputChange = (e) => {
    this.performSearch(e.target.value);
    this.setState({
      ...this.state,
      searchTerm: e.target.value,
      isLoading: true
    })
  }

  render() {
    return (
      <div>

        <SearchField 
          handleChange={this.handleInputChange}
          value={this.state.searchTerm}
        />

        <div>
          {this.state.searchTerm === "" ? 
            <div></div>
          :
          <div>
            <div>
              {(this.state.currentDisplay.artists && this.state.isLoading) ?
                
                <div>{this.state.currentDisplay.artists.items.map((artist, index) => {
                  return (
                    <Card key={index} searchResults={artist}/>
                  )
                })}</div> : null
    
              }
            </div>
          </div>}
        </div>
      </div>
    )
  }
}

export default ArtistSearch;
