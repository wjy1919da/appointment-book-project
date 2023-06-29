import DoctorPostGrid from '../doctor-post-grid/doctor-post-grid.component';
import Footer from '../footer/footer.component';
import './doctor-post.styles.scss'
import React, { useLayoutEffect} from 'react';

const DoctorPost = () => {
    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    });

    return (
        <div className='doctor-post-outer-container'>
            {/* <div className='doctor-post-header-container'>
            </div> */}
            <DoctorPostGrid />
            {/* <Footer /> */}
        </div>
    )
}

export default DoctorPost;