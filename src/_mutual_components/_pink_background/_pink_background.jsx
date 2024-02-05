import React from 'react';
import './_pink_background.scss';

const PinkBackgroundComponent = ({ renderBothBackgrounds }) => {
  return (
    <>
      {renderBothBackgrounds ? (
        <>
          <div className='pink-background-1'></div>
          <div className='pink-background-2'></div>
        </>
      ) : (
        <div className='pink-background-1'></div>
      )}
    </>
  );
};

export default PinkBackgroundComponent;
