import React, { Component } from "react";
import AlbumCard from "./components/AlbumsCard";
import { Link } from "react-router-dom";

import LoadingAnimation from "../../layout/LoadingAnimation";

class ArtistAlbums extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      offset: 50
    }
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    let artistId = this.props.match.params.id;
    let accessToken = this.props.match.params.accessToken;
    fetch(`https://api.spotify.com/v1/artists/${artistId}/albums?offset=0&limit=50`, {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(data => this.setState({
      albums: data.items
    }));
  };

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
    })));
  };

  render(props) {
    let albums = this.state.albums;
    let albumsLoaded;
    let accessToken = this.props.match.params.accessToken;

    if(this.state.albumsLoaded) {
      albumsLoaded = this.state.albumsLoaded.items;
    } else {
      albumsLoaded = [];
    };
    return (
      <div style={{margin: "auto", width: "100%"}}>
        { albums.length === 0 ?
          <LoadingAnimation /> :
          <div style={{textAlign: "center"}}>
            <Link to={"/?access_token=" + accessToken}><button>Back</button></Link>
            <div className="cards-container">
              {albums && albums.map((album, index) => {
                return <AlbumCard album={album} key={index}/>
              })}
            </div>
            
            <div className="cards-container">
              {albumsLoaded.length !== 0 && albumsLoaded.map((album, index) => {
                return <AlbumCard album={album} key={index}/>
              })}
            </div>
            {(albums.length === 0 || albums.length < this.state.offset) ?
              <div></div> :

              <div style={{ textAlign: "center" }}>
                <button className="load-more-btn" onClick={this.loadMoreAlbums}>Load more</button>
              </div>
            }
          </div>
        }

      </div>
    );
  };
};

export default ArtistAlbums;