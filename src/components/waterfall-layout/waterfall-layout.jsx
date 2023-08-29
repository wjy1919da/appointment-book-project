// import React, { useEffect } from 'react';
// import "./waterfall-layout.styles.scss"
// import CommunityPost from '../community-post/community-post.component';
// import profileImage from '../../assets/doctor/profile1.png'
// function WaterfallLayout({posts}) {
//   useEffect(() => {
//     const items = document.getElementsByClassName('item');
//     const gap = 40;

//     const waterFall = () => {
//       const pageWidth = getClient().width;
//       const itemWidth = items[0]?.offsetWidth;
//       if(itemWidth) {
//         const columns = parseInt(pageWidth / (itemWidth + gap));
//         const arr = [];

//         for (let i = 0; i < items.length; i++) {
//           if (i < columns) {
//             items[i].style.top = 0;
//             items[i].style.left = `${(itemWidth + gap) * i}px`;
//             arr.push(items[i].offsetHeight);
//           } else {
//             let minHeight = arr[0];
//             let index = 0;

//             for (let j = 0; j < arr.length; j++) {
//               if (minHeight > arr[j]) {
//                 minHeight = arr[j];
//                 index = j;
//               }
//             }

//             items[i].style.top = `${arr[index] + gap}px`;
//             items[i].style.left = `${items[index].offsetLeft}px`;

//             arr[index] = arr[index] + items[i].offsetHeight + gap;
//           }
//         }
//       }
//     };

//     const getClient = () => {
//       return {
//         width:
//           window.innerWidth ||
//           document.documentElement.clientWidth ||
//           document.body.clientWidth,
//         height:
//           window.innerHeight ||
//           document.documentElement.clientHeight ||
//           document.body.clientHeight,
//       };
//     };

//     const handleResize = () => {
//       waterFall();
//     };

//     window.addEventListener('resize', handleResize);
//     waterFall();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);
  

//   return (
    
//     <div id="box" className="waterfall-layout">
//       {posts.length === 0 && <div>No post yet</div>}
//       {posts && posts.map((post, index) => (
//         <div key={index} className={`item item-${index + 1}`}>
//            <CommunityPost 
//             key={post.id}
//             imageURL={post.pictures}
//             text={post.title}
//             profileImage={profileImage}
//             authorName="test user"
//             likes= '5'
//             //imageURL,text,profileImage,authorName,likes
//          />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default WaterfallLayout;