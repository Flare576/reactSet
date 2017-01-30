import React from 'react';

const renderImage = (image) => {
  return `/assets/images/${image}.svg`
}

export default ({card}) => {
  return (
    <img src={renderImage(card.id)} />
  );
}
