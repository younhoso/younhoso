import React from 'react';
import Lottie from 'react-lottie-player';
import lottieJson from '../public/animation.json'

function Animation() {
  return (
    <Lottie
      loop
      play
      animationData={lottieJson}
      style={{width: 500, margin: '0 auto', }}
    />
  )
}

export default Animation