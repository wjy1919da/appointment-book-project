import React from 'react'
import RightArrow from '../../assets/post/arrow-right.svg';
import './collapse-button.styles.scss';
const CollapseButton = ({title}) => {
  return (
    <span className='section-1'>
        {title}
        <img src={RightArrow} alt='Image-Arrow' />
    </span>
  )
}

export default CollapseButton