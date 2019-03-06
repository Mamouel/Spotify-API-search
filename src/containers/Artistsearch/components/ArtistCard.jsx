import React from 'react';

const ArtistCard = (props) => {

  const artist = props.searchResults;
  console.log(props)
  console.log(artist)

  return (
    <div>{artist.name}</div>
  )
}

export default ArtistCard;