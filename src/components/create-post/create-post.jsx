// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './create-post.style.scss'
// import { useAddPost } from '../../hooks/useAddingPost';
// import creatPostIcon from '../../assets/post/create-post-icon.png'
// const CreatePostOfUser = () => {
//     const [selectedImage, setSelectedImage] = useState(creatPostIcon);
//     const [hasSelectImage, setHasSelectImage] = useState(false);
//     const { mutate } = useAddPost();
//     const [title, setTitle] = useState("");
//     const [text, setText] = useState("");
//     const [tagDoctor, setTagDoctor] = useState(""); // This might need to be handled differently if you're using real tags
//     const [location, setLocation] = useState("");
//     const handlePostCreation = () => {
//         // Create the post object
//         const newPost = {
//             title: title,
//             brief: text, 
//             tags: [{ tagId: 0, tagName: tagDoctor }],
//             location: location,
//             pictures: hasSelectImage ? [selectedImage] : [], // since it's an array, we need to wrap it
//             address: "",
//             coverImg: "",
//             id: 0,
//             isDisplay: 0,
//             lat: "",
//             lon: ""
//             // Add other necessary fields and defaults here
//         };
//         console.log('Sending payload:', newPost);
//         mutate(newPost);
//     };
//     const handleIconClick = () => {
//         // This will open the file selector when the image icon is clicked
//         document.getElementById('imageUpload').click();
//     };
    
//     const handleImageChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setSelectedImage(reader.result);
//                 setHasSelectImage(true);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setHasSelectImage(false);
//         }
//     };
//    return (
//     <div className="create-post-container">
//         <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
//         <div className="choose-picture-conatiner">
//             {hasSelectImage ? (
//                 <img src={selectedImage} onClick={handleIconClick} alt="Selected" />
//             ) : (
//                 <>
//                     <div className="choose-picture-section-title">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing
//                     </div>
//                     <div className='choose-picture-section-image'>
//                         <img src={creatPostIcon} onClick={handleIconClick} alt="Create Post" />
//                     </div>
//                     <div className="choose-picture-section-text">
//                         Lorem ipsum dolor sit amet, consectetur adipiscing
//                     </div>
//                 </>
//             )}
//         </div>
//         <div className="post-information-container">
//             <div className='post-information-multi-input'>
//                     <input
//                         type="text"
//                         className="post-information-customInput"
//                         placeholder="Title"
//                         value={title}
//                         onChange={(e) => setTitle(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="post-information-customInput"
//                         placeholder="Text"
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="post-information-customInput"
//                         placeholder="Tag Doctor"
//                         value={tagDoctor}
//                         onChange={(e) => setTagDoctor(e.target.value)}
//                     />
//                     <input
//                         type="text"
//                         className="post-information-customInput"
//                         placeholder="Add Location"
//                         value={location}
//                         onChange={(e) => setLocation(e.target.value)}
//                     />
//             </div>
//             <div className='post-information-sendButton'>
//                 <button class="create-post-custom-button"  onClick={handlePostCreation}>Post</button>
//             </div>
//         </div>
//     </div>
//   );
// }

// export default CreatePostOfUser;