import React, { useState, useEffect } from 'react';

// scss
import './community-post-create-page.scss';

// components
import { useAddPost } from '../../../hooks/useAddingPost';
import FormButton from '../../components-posts/community-post-button/community-post-button';
import Footer from '../../footer/footer.component';

// scss
import './community-post-create-page.scss';

// images
import creatPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';

const CreatePostPage = () => {
  const [selectedImage, setSelectedImage] = useState(creatPostIcon);
  const [hasSelectImage, setHasSelectImage] = useState(false);
  const { mutate } = useAddPost();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [tagDoctor, setTagDoctor] = useState('');
  const [location, setLocation] = useState('');
  const [clickedRadio, setClickedRadio] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handlePostCreation = () => {
    const newPost = {
      title: title,
      brief: text,
      tags: [{ tagId: 0, tagName: tagDoctor }],
      location: location,
      pictures: hasSelectImage ? [selectedImage] : [],
      address: '',
      coverImg: '',
      id: 0,
      isDisplay: 0,
      lat: '',
      lon: '',
    };
    console.log('Sending payload:', newPost);
    mutate(newPost);
  };

  const handleIconClick = () => {
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

  // radio button
  const handleRadioClick = () => {
    setClickedRadio((prevState) => !prevState);
  };

  return (
    <div className='create-post-page-container'>
      <div className='pink-background-1'></div>
      <div className='pink-background-2'></div>
      <button className='create-post-page-back-button-container'>
        <img src={Arrow} alt='Image-Arrow-Icon' className='arrow-back-button' />
        <span className='create-post-page-back-button'>Create a post</span>
      </button>
      <div className='create-post-page-inner-container'>
        <input
          type='file'
          id='imageUpload'
          accept='image/*'
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
        {hasSelectImage ? (
          <img src={selectedImage} onClick={handleIconClick} alt='Selected' />
        ) : (
          <>
            <div className='left-container'>
              <div className='create-post-page-add'>
                <img
                  src={creatPostIcon}
                  onClick={handleIconClick}
                  alt='Image-Create-Post'
                />
              </div>
              <div className='create-post-page-text'>
                Lorem ipsum dolor sit amet, consectetur adipiscing
              </div>
            </div>
          </>
        )}
        <div className='right-container'>
          <form className='form'>
            <input
              type='text'
              placeholder='Title'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className='create-post-page-title'
            />
            <textarea
              name='description'
              id='description'
              placeholder='Description'
              className='create-post-page-description'
            ></textarea>

            <div className='create-post-page-tag-container'>
              <span className='create-post-page-tag-name'>#Tag</span>
              <span className='create-post-page-location-tag-name'>
                Add Location
              </span>
            </div>
          </form>

          <div className='wrapper'>
            {/* --- radio button --- */}
            <div className='create-post-page-radio-button-container'>
              <input
                id='input-linked'
                type='radio'
                name='input-radio-button'
                checked={clickedRadio}
                onClick={handleRadioClick}
                className='create-post-input-radio-button'
              />
              <label
                htmlFor='input-linked'
                className='create-post-input-radio-button-label'
              >
                Restrict my post to viewers over 18
              </label>
            </div>

            {/* --- button --- */}
            <div className='post-information-sendButton'>
              <FormButton
                buttonName="Post"
                handlePostCreation={handlePostCreation}
                className='create-post-custom-button'
              />
            </div>
          </div>
        </div>
      </div>
      <div className='footer-container'>
        <Footer />
      </div>
    </div>
  );
};

export default CreatePostPage;
