import React, { Component } from "react";
import queryString from 'query-string';

import { Link } from "react-router-dom";

import ArtistCard from "./components/ArtistCard";
import SearchField from "./components/SearchField";

class ArtistSearch extends Component {
  constructor(props) {
    super(props);
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

  render(props) {
    let { accessToken } = this.props;
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
                    <Link to={`/artists/${artist.id}/${accessToken}`} key={index}><ArtistCard  searchResults={artist}/></Link>
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
