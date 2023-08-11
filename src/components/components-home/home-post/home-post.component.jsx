import Decoration from '../../../assets/home/decoration-post.png';
import vector from '../../../assets/home/Vector.png'
import PostContainerMobile from '../../../assets/home/post_container.svg'
import Tag1 from '../../../assets/home/tag1.svg'
import Tag2 from '../../../assets/home/tag2.svg'
import Tag4 from '../../../assets/home/tag4.svg' 
import { Link } from 'react-router-dom';
import HomeMobileSubText from '../home-text-mobile/home-mobile-subText.component';
import './home-post.styles.scss';
import HomeLink from '../home-link/home-link.component';
import { useMediaQuery } from 'react-responsive';
import { Fragment } from 'react';
const HomePost = () => {
    const isMobile = useMediaQuery({ query: `(max-width: 576px)` });
    const isIpad = useMediaQuery({ query: `(min-width: 576px) and (max-width: 1024px)` });
    const isMobileOrIpad = isMobile || isIpad;
    return (
        <div className="Home-post">
            <div className='home-mobile-share-pic-container'>
                    {!isMobile&&<Fragment>
                        <div className='home-post-pic animate__animated animate__slideInUp'>
                            <div className='post-pic'></div>
                            <div className="p-topic">
                                <img src={Decoration} className="decoration-pic1" alt=''></img>
                                <img src={Decoration} className="decoration-pic2" alt=''></img>
                                <div className="decoration-pic1"></div>
                                <div className='decoration-pic2'></div>
                                <span className="post-topic topic1">#Occaecat</span>
                                <span className="post-topic topic2">#Adipiscing</span>
                                <span className="post-topic topic3">#lorem </span>
                                <span className="post-topic topic4">#Eiusmod </span>
                                <span className="post-topic topic5">#Excepteur</span>
                            </div>
                        </div>
                    </Fragment>}                
                {isMobile&&<Fragment>
                    <div className='home-post-pic animate__animated animate__slideInUp'></div>
                    <img src={PostContainerMobile} alt="postcontainermobile" className='home-mobile-share-postContainer'></img>
                    <img src={Tag1} className='home-mobile-share-tag1'></img>
                    <img src={Tag4} className='home-mobile-share-tag4'></img>
                    <img src={Tag2} className='home-mobile-share-tag2'></img>
                </Fragment>}      
            </div>
            <div className='home-post-container'>
                {/* Web */}
                {!isMobileOrIpad&&<Fragment>
                    <div className='home-post-text'>
                        <span className='home-post-text1'>Share Your Post</span>
                    </div>
                    <div className ='home-post-subText'>
                        <span className='postText'> Our platform is a transparent community where beauty 
                        lovers can connect and empower each other. 
                        Share your cosmetic experience and explore others’ posts. 
                        Know the market and stay on-trend. Discover exceptional savings and exclusive offers.
                        </span>
                    </div> 
                    <div className='home-post-link'>
                        {/* <span className="underline-link">View More Posts</span> */}
                        <HomeLink title="View More Posts" href="/posts" />
                        <img src={vector} alt="arrow" style={{width:"18px",height:"17px",marginTop:"3px",marginLeft:"10px", border: "None"}}></img>
                    </div>                    
                </Fragment>}
                {/* Mobile */}
                {isMobileOrIpad&&<Fragment>
                    <HomeMobileSubText title='Share' content='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut'></HomeMobileSubText>
                    <Link to='/posts' className='home-mobile-share-link'>View More Posts</Link>
                </Fragment>}
            </div>
        </div>
    )
}

export default HomePost;