import React from "react";

import defaultAlbumImage from "../../../style/images/defaultArtistImage.jpg";

const AlbumCard = (props) => {
  const album = props.album;
  const artistArray = album.artists.map((artist) => {
    return artist.name
  });
  const albumUrl = album.external_urls.spotify;
  const image = album.images.length === 0 ? defaultAlbumImage : album.images[0].url;
  const releaseDate = album.release_date;
  const totalTracks = album.total_tracks;
  return (

    <a href={albumUrl} target="_blank" rel="noopener noreferrer">
      <div className="card-container" style={{ margin: 10, position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: 0, height: 250, width: 300, backgroundImage: `url(${image})`, backgroundSize: "cover" }} />
        <div style={{ position: "absolute", top: 250, left: 0, backgroundColor: "#1dd1a1", height: 150, width: 300, color: "white", textAlign: "left" }}>
          <div style={{ padding: 10, fontSize: 20, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>{album.name}</div>
          <div  style={{ padding: 10, fontSize: 12 }}>
            {artistArray.length === 1 ? artistArray.map((artist, index) => artist) : artistArray.map((artist, index) => " " + artist + "," )}
          </div>
          <div style={{ position: "absolute", bottom: 10, left: 0, padding: 10, backgroundColor: "#1dd1a1", color: "white", fontSize: 15 }}>
            <div>{releaseDate}</div>
            <div>{totalTracks} tracks</div>
          </div>
        </div>
      </div>
    </a>
  );
};

export default AlbumCard;