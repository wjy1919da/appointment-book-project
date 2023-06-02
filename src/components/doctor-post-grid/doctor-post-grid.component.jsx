import Masonry from 'react-masonry-css'
import './doctor-post-grid.styles.scss'
import DoctorPostCard from '../doctor-post-card/doctor-post-card.component'
const DoctorPostGrid = ({posts}) => {
   console.log("posts",posts);
   const postCardList = posts.map(post => <DoctorPostCard key={post.id} postImg={post.Img} description={post.description} />);
   const breakpointColumnsObj = {
      default: 3,
        1100: 2,
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