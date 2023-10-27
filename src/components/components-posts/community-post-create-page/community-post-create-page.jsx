import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

// scss
import './community-post-create-page.scss';

// components
import FormButton from '../../components-posts/community-post-button/community-post-button';
import Footer from '../../footer/footer.component';
import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// import { useAddPost } from '../../../hooks/useAddingPost';

// hook
import { useApiRequest } from '../../../hooks/useApiRequest';

// scss
import './community-post-create-page.scss';

// images
import creatPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';
import { ErrorSharp } from '@mui/icons-material';

const CreatePostPage = () => {
  const [selectedImage, setSelectedImage] = useState(creatPostIcon);
  const [hasSelectImage, setHasSelectImage] = useState(false);
  const [clickedRadio, setClickedRadio] = useState(false);
  // const [text, setText] = useState('');
  // const [tagDoctor, setTagDoctor] = useState('');
  // const [location, setLocation] = useState('');
  // const { mutate } = useAddPost();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // api
  const { mutate: apiMutate } = useApiRequest({
    onError: (error) => {
      console.error('API request error', error);
    },
  });

  const onSubmit = (data) => {
    const formData = {
      address: '',
      brief: data.description,
      coverImg: '',
      id: 0,
      isDisplay: 0,
      lat: '',
      location: '',
      lon: '',
      pictures: hasSelectImage ? [selectedImage] : [],
      tags: [
        {
          tagId: 0,
          tagName: '',
        },
      ],
      title: data.title,
    };
    // console.log('payload - formData:', formData);
    console.log(data);
    apiMutate(formData);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // const handlePostCreation = () => {
  //   const newPost = {
  //     title: title,
  //     brief: text,
  //     tags: [{ tagId: 0, tagName: tagDoctor }],
  //     location: location,
  //     pictures: hasSelectImage ? [selectedImage] : [],
  //     address: '',
  //     coverImg: '',
  //     id: 0,
  //     isDisplay: 0,
  //     lat: '',
  //     lon: '',
  //   };
  //   console.log('Sending payload:', newPost);
  //   mutate(newPost);
  // };

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='create-post-page-container'
    >
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
          <div>
            <input
              type='text'
              placeholder='Title'
              className='create-post-page-title'
              {...register('title', {
                required: '* Title is required.',
                maxLength: {
                  value: 20,
                  message: '* Maximum limit for characters is 20.',
                },
              })}
            />
            <p className='title-error-validation'>{errors.title?.message}</p>

            <div className='description-container'>
              <textarea
                name='brief'
                id='description'
                placeholder='Description'
                className='create-post-page-description'
                {...register('description', {
                  required: '* Description is required.',
                })}
              ></textarea>

              <PostDropDownFilter />
              <PostDropDownFilter />

              <p className='description-error-validation'>
                {errors.description?.message}
              </p>
            </div>
          </div>

          <div className='wrapper'>
            {/* --- radio button --- */}
            <div className='create-post-page-radio-button-container'>
              <input
                id='input-linked'
                type='radio'
                name='input-radio-button'
                checked={clickedRadio}
                onChange={handleRadioClick}
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
                buttonName='Post'
                className='create-post-custom-button'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='footer-container'>
        <Footer />
      </div>
    </form>
  );
};

export default CreatePostPage;
