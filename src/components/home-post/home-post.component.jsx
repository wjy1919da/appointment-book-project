import PostContainer from '../../assets/home/post-container.png';
import Decoration from '../../assets/home/decoration-post.png';
import vector from '../../assets/home/Vector.png'

import './home-post.styles.scss';
import HomeLink from '../home-link/home-link.component';

const HomePost = () => {
    return (
        <div className="Home-post">
            <div className='home-post-pic animate__animated animate__slideInUp'>
                    <img src={PostContainer} alt="postcontainer" className='post-pic'></img>
                    <img src={Decoration} className="decoration-pic1" alt=''></img>
                    <img src={Decoration} className="decoration-pic2" alt=''></img>
                    <div className="p-topic">
                        <span className="post-topic"style={{marginTop:"130px",marginLeft:"180px"}}>#Occaecat</span>
                        <span className="post-topic"style={{marginTop:"250px",marginLeft:"80px"}}>#Adipiscing</span>
                        <span className="post-topic"style={{marginTop:"330px",marginLeft:"130px"}}>#lorem </span>
                        <span className="post-topic"style={{marginTop:"600px",marginLeft:"650px"}}>#Eiusmod </span>
                        <span className="post-topic"style={{marginTop:"680px",marginLeft:"550px"}}>#Excepteur</span>
                    </div>
            </div>
            <div className='home-post-container'>
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
            </div>
        </div>
    )
}

export default HomePost;