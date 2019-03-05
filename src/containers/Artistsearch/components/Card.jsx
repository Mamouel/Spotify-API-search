import React from 'react';

const Card = (props) => {
  console.log(props.searchResults)
  const artist = props.searchResults;
  return (
    <div>{artist.name}</div>
  )
}

export default Card;