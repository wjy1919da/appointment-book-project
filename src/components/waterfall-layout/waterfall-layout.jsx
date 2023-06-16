import React, { useEffect } from 'react';
import "./waterfall-layout.styles.scss"
import image1 from '../../assets/doctor/post1.png'
import image2 from '../../assets/doctor/post2.png'
import image3 from '../../assets/doctor/post3.png'
import image4 from '../../assets/doctor/post4.png'
import image5 from '../../assets/doctor/post5.png'
import image6 from '../../assets/doctor/post6.png'
import image7 from '../../assets/doctor/post7.png'
import image8 from '../../assets/doctor/post8.png'
import image9 from '../../assets/doctor/post9.png'
import image10 from '../../assets/doctor/post10.png'
import image11 from '../../assets/doctor/post11.png'
import image12 from '../../assets/doctor/post12.png'
import profile1 from '../../assets/doctor/profile1.png'
import profile2 from '../../assets/doctor/profile2.png'
import profile3 from '../../assets/doctor/profile3.png'
import profile4 from '../../assets/doctor/profile4.png'
import profile5 from '../../assets/doctor/profile5.png'
import profile6 from '../../assets/doctor/profile6.png'
import profile7 from '../../assets/doctor/profile7.png'
import profile8 from '../../assets/doctor/profile8.png'
import profile9 from '../../assets/doctor/profile9.png'
import profile10 from '../../assets/doctor/profile10.png'
import profile11 from '../../assets/doctor/profile11.png'
import profile12 from '../../assets/doctor/profile12.png'
import CommunityPost from '../community-post/community-post';

function WaterfallLayout() {
  useEffect(() => {
    const items = document.getElementsByClassName('item');
    const gap = 40;

    const waterFall = () => {
      const pageWidth = getClient().width;
      const itemWidth = items[0].offsetWidth;
      const columns = parseInt(pageWidth / (itemWidth + gap));
      const arr = [];

      for (let i = 0; i < items.length; i++) {
        if (i < columns) {
          items[i].style.top = 0;
          items[i].style.left = `${(itemWidth + gap) * i}px`;
          arr.push(items[i].offsetHeight);
        } else {
          let minHeight = arr[0];
          let index = 0;

          for (let j = 0; j < arr.length; j++) {
            if (minHeight > arr[j]) {
              minHeight = arr[j];
              index = j;
            }
          }

          items[i].style.top = `${arr[index] + gap}px`;
          items[i].style.left = `${items[index].offsetLeft}px`;

          arr[index] = arr[index] + items[i].offsetHeight + gap;
        }
      }
    };

    const getClient = () => {
      return {
        width:
          window.innerWidth ||
          document.documentElement.clientWidth ||
          document.body.clientWidth,
        height:
          window.innerHeight ||
          document.documentElement.clientHeight ||
          document.body.clientHeight,
      };
    };

    const handleResize = () => {
      waterFall();
    };

    window.addEventListener('resize', handleResize);
    waterFall();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  const posts = [
    { imageURL: image1, text: 'Two weeks after surgery', profileImage: profile1, authorName: 'Anna', likes: '77' },
    { imageURL: image2, text: 'Before and after my breast augmentation', profileImage: profile2, authorName: 'Alison', likes: '325' },
    { imageURL: image3, text: 'Free consultation for our new customers', profileImage: profile3, authorName: 'Tony', likes: '748' },
    { imageURL: image4, text: 'Visit my doctor today', profileImage: profile4, authorName: 'Alice', likes: '48' },
    { imageURL: image5, text: '4 month MOHS Surgery Update', profileImage: profile5, authorName: 'Amber', likes: '745' },
    { imageURL: image6, text: 'Every man would dream about this', profileImage: profile6, authorName: 'Bob', likes: '23' },
    { imageURL: image7, text: 'Should you try bow lift?', profileImage: profile7, authorName: 'Isabella', likes: '696' },
    { imageURL: image8, text: 'Patients at their 2 week botox follow up', profileImage: profile8, authorName: 'Charlotte', likes: '23' },
    { imageURL: image9, text: 'My last day at Sunshine', profileImage: profile9, authorName: 'Mia', likes: '63' },
    { imageURL: image10, text: 'This is amazing!!', profileImage: profile10, authorName: 'Grace', likes: '786' },
    { imageURL: image11, text: '5 things you should know before buttock enhancement', profileImage: profile11, authorName: 'Emma', likes: '756' },
    { imageURL: image12, text: 'My brutally honest review of plastic surgery', profileImage: profile12, authorName: 'Ella', likes: '698' },

  ];

  // const items =posts.map((post, index) => (
  //      <CommunityPost 
  //      key={index}
  //      imageURL={post.imageURL}
  //        text={post.text}
  //       profileImage={post.profileImage}
  //        authorName={post.authorName}
  //       likes={post.likes}
  //   />
  //   ));

  return (
    <div id="box" className="waterfall-layout">
      {posts.map((post, index) => (
        <div key={index} className={`item item-${index + 1}`}>
          <CommunityPost
            imageURL={post.imageURL}
            text={post.text}
            profileImage={post.profileImage}
            authorName={post.authorName}
            likes={post.likes}
          />
        </div>
      ))}
    </div>
  );
}

export default WaterfallLayout;