import Masonry from 'react-masonry-css'
import './doctor-post-grid.styles.scss'
import CommunityPost from '../community-post/community-post.component'
import profileImage from '../../assets/doctor/profile1.png'
import DoctorPostCard from '../doctor-post-card/doctor-post-card.component'


const DoctorPostGrid = ({posts}) => {
   
    const postCardList =posts.map(post => (
        <CommunityPost 
            key={post.id}
            imageURL={post.pictures}
            text={post.title}
            profileImage={profileImage}
            authorName="test user"
            likes= '5'
            //imageURL,text,profileImage,authorName,likes
        />
    ));
   const breakpointColumnsObj = {
      default: 5,
        1100: 4,
        700: 1,
   }
   return(
    <div className='doctor-post-grid-container'>
          <Masonry
           breakpointCols = {breakpointColumnsObj}
           className="my-masonry-grid"
           columnClassName="my-masonry-grid_column"
          >
           {postCardList}
         </Masonry>
    </div>
          
   )
   
}
export default DoctorPostGrid;