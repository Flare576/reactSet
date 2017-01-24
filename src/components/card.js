import React from 'react';

const renderImage = (image) => {
  //return require(`react-svg?es5=1!../../assets/images/${image}.svg`);
  //return `../../assets/images/${image}.svg`
  return `/assets/images/${image}.svg`
  //return import image from '../../assets/images-reacted/${image}.svg'
}

export default ({card}) => {
  return (
    <img src={renderImage(card.id)} />
  );
}
