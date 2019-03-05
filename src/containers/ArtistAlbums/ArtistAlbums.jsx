import React, { Component } from 'react';
import AlbumCard from "./components/AlbumsCard";

export default class ArtistAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      offset: 50
    }
  }
  componentDidMount() {
    let artistId = this.props.match.params.id;

    let accessToken = this.props.match.params.accessToken;

    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?offset=0&limit=50`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      albums: data.items
    }))
  }

  loadMoreAlbums = () => {
    let artistId = this.props.match.params.id;
    let accessToken = this.props.match.params.accessToken;
    let offset = this.state.offset;
    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?offset=${this.state.offset}&limit=50`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState(prevState => ({
      albums: [...prevState.albums, ...data.items],
      offset: offset + 50
    })))
  }

  render(props) {
    let albums = this.state.albums;
    let albumsLoaded;
    if(this.state.albumsLoaded) {
      albumsLoaded = this.state.albumsLoaded.items;
    } else {
      albumsLoaded = []
    }
    return (
      <div>
        <div>
          {albums && albums.map((album, index) => {
            return <AlbumCard album={album} key={index}/>
          })}
        </div>
        
        <div>
          {albumsLoaded.length !== 0 && albumsLoaded.map((album, index) => {
            return <AlbumCard album={album} key={index}/>
          })}
        </div>
      <button onClick={this.loadMoreAlbums}>Load more</button>

      </div>
    )
  }
}
