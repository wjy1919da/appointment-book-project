import { useState } from 'react';
import './home-title.styles.scss'

const HomeTitle = ({title,isMobile}) => {

    return (
        <div>
        {isMobile?(
            <div className='home-title-mobile'>
                {title}
            </div>
        ):(
            <div className='home-title-website'>
                {title}
            </div>
        )}
        </div>
    )
};
export default HomeTitle;