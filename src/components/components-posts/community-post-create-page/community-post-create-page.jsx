import React, { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import userInfoQueryStore from '../../../userStore';
// import { useDisclosure } from '@chakra-ui/react';

// components
import FormButton from '../../components-posts/community-post-button/community-post-button';
import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestPost } from '../../../hooks/useApiRequestPost';
import useUploadImg from '../../../hooks/useUploadImg';

// scss
import './community-post-create-page.scss';

// images
import createPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';

const CreatePostPage = () => {
  const toast = useToast();

  const {
    selectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    resetFiles,
  } = useUploadImg();

  const [clickedRadio, setClickedRadio] = useState(false);
  const fileInputRef = useRef(null);
  const userInfo = userInfoQueryStore((state) => state.userInfo);

  const navigate = useNavigate();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // api
  const { mutate: apiMutate, data } = useApiRequestPost({
    onError: (error) => {
      toast({
        title: 'Failed to create post.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
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
      pictures: uploadedFiles,
      tags: [
        {
          tagId: 0,
          tagName: '',
        },
      ],
      title: data.title,
    };
    if (!userInfo?.token) {
      toast({
        title: 'Please login first.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    apiMutate(formData);
    resetFiles();
  };

  useEffect(() => {
    // console.log("data::", data);
    if (data?.code === 100) {
      toast({
        title: 'Post created successfully.',
        status: 'success',
        duration: 1000,
        isClosable: true,
      });
    }
    if (data?.code === 500) {
      toast({
        title: 'Failed to create post.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  }, [data, toast]);

  // back button
  const handleClickCreatePostBack = () => {
    navigate('/posts');
  };

  const displayImage =
    selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : null;

  // file upload
  const handleBrowseFiles = () => {
    fileInputRef.current.click();
  };
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    handleFileSelection({ target: { files: e.dataTransfer.files } });
  };

  // radio button
  const handleRadioClick = () => {
    setClickedRadio((prevState) => !prevState);
  };

  // thumbnail
  // const displayThumbnails =
  //   selectedFiles.length > 0
  //     ? selectedFiles.map((file, index) => (
  //         <div key={index}>
  //           <img
  //             src={URL.createObjectURL(file)}
  //             className='thumbnail'
  //             alt={`Selected Thumbnail ${index + 1}`}
  //           />
  //         </div>
  //       ))
  //     : null;

  const displayThumbnails =
    selectedFiles.length > 0
      ? selectedFiles.map((file, index) => (
          <div key={index} className='create-post-page-thumbnail'>
            <img
              src={URL.createObjectURL(file)}
              className='thumbnail'
              alt={`Selected Thumbnail ${index + 1}`}
              style={{
                width: '70px',
                height: '70px',
                objectFit: 'cover',
              }}
            />
          </div>
        ))
      : null;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='create-post-page-container'
      >
        <div className='pink-background-1'></div>
        <div className='pink-background-2'></div>

        <button
          type='button'
          onClick={handleClickCreatePostBack}
          className='create-post-page-back-button-container'
        >
          <img
            src={Arrow}
            alt='Image-Arrow-Icon'
            className='create-post-page-arrow-back-button'
          />
          <span className='create-post-page-back-button'>Create a post</span>
        </button>

        <div className='create-post-page-inner-container'>
          <div className='create-post-page-wrapper'>
            <input
              ref={fileInputRef}
              type='file'
              id='imageUpload'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileSelection}
              multiple
            />
            {displayImage ? (
              <img
                src={displayImage}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: '330px',
                  height: '330px',
                  objectFit: 'contain',
                }}
                alt='Selected'
              />
            ) : (
              <>
                <div className='create-post-page-left-container'>
                  <div
                    className='create-post-page-add'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleBrowseFiles}
                  >
                    <img
                      src={createPostIcon}
                      style={{
                        width: '157px',
                        height: '157px',
                      }}
                      alt='Image-Create-Post'
                    />
                  </div>
                  <div className='create-post-page-text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                  </div>
                </div>
              </>
            )}

            {/* thumbnail */}
            <div className='create-post-page-thumbnail-container'>
              {displayThumbnails}

              {/* thumbnail create */}
              {displayThumbnails && (
                <div
                  className='create-post-page-add-thumbnail'
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleBrowseFiles}
                >
                  <img
                    src={createPostIcon}
                    style={{
                      width: '60px',
                      height: '60px',
                    }}
                    alt='Image-Create-Post'
                  />
                </div>
              )}
            </div>
          </div>

          <div className='create-post-page-right-container'>
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

              <p className='create-post-page-title-error-validation'>
                {errors.title?.message}
              </p>

              <div className='create-post-page-description-container'>
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

                <p className='create-post-page-description-error-validation'>
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div className='create-post-page-button-wrapper'>
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
      </form>
    </div>
  );
};

export default CreatePostPage;
