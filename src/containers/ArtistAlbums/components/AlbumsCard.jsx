import React from 'react';

const AlbumCard = (props) => {
  const album = props.album;

  return (
    <div>{album.name}</div>
  )
}

export default AlbumCard;