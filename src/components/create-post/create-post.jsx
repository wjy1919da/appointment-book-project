import { Menu } from 'antd';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './create-post.style.scss'
import creatPostIcon from '../../assets/post/create-post-icon.png'
const CreatePostOfUser = () => {
    const [selectedImage, setSelectedImage] = useState(creatPostIcon);
    const [hasSelectImage, setHasSelectImage] = useState(false);
    
    const handleIconClick = () => {
        // This will open the file selector when the image icon is clicked
        document.getElementById('imageUpload').click();
    };
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
                setHasSelectImage(true);
            };
            reader.readAsDataURL(file);
        } else {
            setHasSelectImage(false);
        }
    };
   return (
    <div className="create-post-container">
        <input type="file" id="imageUpload" accept="image/*" style={{ display: 'none' }} onChange={handleImageChange} />
        <div className="choose-picture-conatiner">
            {hasSelectImage ? (
                <img src={selectedImage} onClick={handleIconClick} alt="Selected" />
            ) : (
                <>
                    <div className="choose-picture-section-title">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                    <div className='choose-picture-section-image'>
                        <img src={creatPostIcon} onClick={handleIconClick} alt="Create Post" />
                    </div>
                    <div className="choose-picture-section-text">
                        Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                </>
            )}
        </div>
        <div className="post-information-container">
            <div className='post-information-multi-input'>

                    <input type="text" className="post-information-customInput" placeholder="Title"></input>


                    <input type="text" className="post-information-customInput" placeholder="Text"></input>

                    <input type="text" className="post-information-customInput" placeholder="Tag Doctor"></input>
                    <input type="text" className="post-information-customInput" placeholder="Add Location"></input>
            </div>
            <div className='post-information-sendButton'>
                <button class="create-post-custom-button">Post</button>
            </div>
        </div>
    </div>
  );
}

export default CreatePostOfUser;