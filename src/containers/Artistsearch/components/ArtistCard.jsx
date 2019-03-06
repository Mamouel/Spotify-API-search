import React from "react";
import defaultArtistImage from "../../../style/images/defaultArtistImage.jpg";
import Rating from "react-rating";

const ArtistCard = (props) => {

  const artist = props.searchResults;
  const image = artist.images.length === 0 ? defaultArtistImage : artist.images[0].url;
  const followers = artist.followers.total;
  const rating = Math.floor(artist.popularity /20);

  return (
    <div className="card-container" style={{ margin: 10, position: "relative" }}>
      <div style={{ position: "absolute", top: 0, left: 0, height: 250, width: 300, backgroundImage: `url(${image})`, backgroundSize: "cover" }} />
      <div style={{ position: "absolute", top: 250, left: 0, backgroundColor: "#1dd1a1", height: 150, width: 300, color: "white", textAlign: "left" }}>
        <div style={{ margin: 10, fontSize: 20 }}>{artist.name}</div>
        <div  style={{ margin: 10, fontSize: 12 }}>{followers} followers</div>
        <Rating
          initialRating={rating}
          readonly
          style={{ position: "absolute", bottom: 10, left: 10 }}
        />
      </div>
    </div>
  );
};

export default ArtistCard;