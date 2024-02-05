import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import userInfoQueryStore from '../../../userStore';
import usePostQueryStore from '../../../postStore';
import { Toast, assignRef, useToast } from '@chakra-ui/react';
import ChakraModal from '../../chakra-modal/chakra-modal';

import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

// components
import FormButton from '../../components-posts/community-post-button/community-post-button';
// import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestEditPost } from '../../../hooks/useApiEditPost';
import { useDeletePost } from '../../../hooks/useApiEditPost';
import useUploadImg from '../../../hooks/useUploadImg';
import { useApiRequestPost } from '../../../hooks/useApiEditPost'; // Create post

// scss
import './community-post-edit-page.scss';

// images
import createPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';
import Trash from '../../../assets/post/trash_icon.svg';
import DeleteButton from '../../../assets/post/thumbnail_delete.png';

const EditPostPage = () => {
  const location = useLocation();
  const isCreatePost = location.pathname.includes('/posts/create-post');

  // call api hooks
  const {
    selectedFiles,
    setSelectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    setUploadedFiles,
    resetFiles,
    removeUploadedFile,
  } = useUploadImg();
  const { mutate: apiEditMutate } = useApiRequestEditPost();
  const { mutate: apiCreateMutate } = useApiRequestPost();
  const {
    mutate: apiDeleteMutate,
    data: deleteData,
    isSuccess: isDeleteSuccess,
    isError: isDeleteError,
  } = useDeletePost();

  const [selectedImage, setSelectedImage] = useState(null);
  const [clickedRadio, setClickedRadio] = useState(false); // restrict over 18
  const [clickedThumbnailIndex, setClickedThumbnailIndex] = useState(null); // thumbnail click masking

  const postQuery = usePostQueryStore((state) => state.postQuery);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  // console.log("EditPostPage", postQuery);

  // refs
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const toast = useToast();

  // chakura ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setUploadedFiles(postQuery.pictures);
    // set the selected image to the last image in the uploadedFiles array
    if (postQuery.pictures && postQuery.pictures.length > 0) {
      setSelectedImage(postQuery.pictures[postQuery.pictures.length - 1]);
    }
  }, [postQuery.pictures]);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: isCreatePost ? '' : postQuery.title,
      description: isCreatePost ? '' : postQuery.description,
    },
  });
  // api
  const onSubmit = (data) => {
    console.log('data', data);
    const displayImage =
      selectedImage || (uploadedFiles.length > 0 ? uploadedFiles[0] : null);

    const formData = {
      address: '',
      brief: data.description,
      coverImg: displayImage,
      isDisplay: 1,
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
    if (isCreatePost) {
      apiCreateMutate(formData);
    } else {
      formData.id = postQuery.postID;
      apiEditMutate(formData);
    }
    resetFiles();
  };

  // when click on trash icon
  const handleClickModal = () => {
    onOpen();
  };

  // when click on delete button
  const handleClickDelete = () => {
    // console.log("POSTQUERY:", postQuery);
    const postId = postQuery.postID;
    apiDeleteMutate(postId);
    onClose();
  };

  useEffect(() => {
    if (isCreatePost) {
      setUploadedFiles([]);
      setSelectedImage(null);
    } else {
      setUploadedFiles(postQuery.pictures);
      if (postQuery.pictures && postQuery.pictures.length > 0) {
        setSelectedImage(postQuery.pictures[postQuery.pictures.length - 1]);
      }
    }
  }, [isCreatePost, postQuery.pictures]);
  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setSelectedImage(uploadedFiles[uploadedFiles.length - 1]);
    }
  }, [uploadedFiles]);

  // back button
  const handleClickCreatePostBack = () => {
    const accountType = localStorage.getItem('accountType');

    if (location.pathname.includes('/posts/create-post')) {
      navigate('/posts');
    } else if (location.pathname.includes('/posts/edit-post')) {
      if (accountType === '1') {
        navigate('/doctorProfile/#Posts');
      } else if (accountType === '2') {
        navigate('/userProfile/#Posts');
      } else {
        navigate('/');
      }
    }
  };
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

  const handleClickMask = (index) => {
    // console.log(`Thumbnail index ${index} is clicked`);
    setSelectedImage(uploadedFiles[index]);
    setClickedThumbnailIndex(index);
  };

  // thumbnail
  const displayThumbnails =
    uploadedFiles.length > 0
      ? uploadedFiles.map((file, index) => (
          <div key={index} className='edit-post-page-thumbnail'>
            <div
              className={`thumbnail ${selectedImage === file ? 'clicked' : ''}`}
              onClick={() => handleClickMask(index)}
            >
              <img
                src={file}
                alt={`Selected Thumbnail ${index + 1}`}
                style={{
                  width: '70px',
                  height: '70px',
                  borderRadius: '8px',
                  objectFit: 'cover',
                }}
              />
            </div>
            <button
              type='button'
              className='delete-thumbnail-button'
              onClick={() => removeUploadedFile(index)}
              style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#A5A6A7',
                borderRadius: '50%',
                position: 'absolute',
                top: '-5px',
                right: '-5px',
              }}
            >
              <img
                src={DeleteButton}
                alt='Icon-Delete-Button'
                className='edit-post-page-delete-button'
              />
            </button>
          </div>
        ))
      : null;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='edit-post-page-container'
      >
        <div className='pink-background-1'></div>
        <div className='pink-background-2'></div>

        <button
          type='button'
          onClick={handleClickCreatePostBack}
          className='edit-post-page-back-button-container'
        >
          <img
            src={Arrow}
            alt='Image-Arrow-Icon'
            className='edit-post-page-arrow-icon-back-button'
          />
          <span className='edit-post-page-label-back-button'>
            {isCreatePost ? 'Create Post' : 'Edit Your Post'}
          </span>
        </button>

        <div className='edit-post-page-inner-container'>
          <div className='edit-post-page-left-container-wrapper'>
            <input
              ref={fileInputRef}
              type='file'
              id='imageUpload'
              accept='image/*'
              style={{ display: 'none' }}
              onChange={handleFileSelection}
              multiple
            />

            {/* {displayImage && selectedImage ? ( */}
            <div className='edit-post-pic-wrapper'>
              {uploadedFiles.length > 0 ? (
                <img
                  src={selectedImage}
                  style={{
                    marginBottom: '20px',
                    maxWidth: '100%',
                    maxHeight: '100%',
                    width: '330px',
                    height: '330px',
                    objectFit: 'cover',
                  }}
                  alt='Selected'
                />
              ) : (
                <>
                  <div className='edit-post-page-left-container'>
                    <div
                      className='edit-post-page-add'
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
                    <div className='edit-post-page-text'>
                      Add Png/Jpeg File Here!
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* thumbnail */}
            <div className='edit-post-page-thumbnail-container'>
              {displayThumbnails}

              {/* create thumbnail */}
              {displayThumbnails && uploadedFiles.length < 3 && (
                <div
                  className='edit-post-page-add-thumbnail'
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

          <div className='edit-post-page-right-container'>
            <div className='edit-post-page-right-inner-container'>
              <input
                type='text'
                placeholder='Title'
                className='edit-post-page-title'
                {...register('title', {
                  required: '* Title is required.',
                  maxLength: {
                    value: 20,
                    message: '* Maximum limit for characters is 20.',
                  },
                })}
                defaultValue={postQuery.title}
              />
              <p className='edit-post-page-title-error-validation'>
                {errors.title?.message}
              </p>

              <div className='description-container'>
                <textarea
                  name='brief'
                  id='description'
                  placeholder='Description'
                  className='edit-post-page-description'
                  {...register('description', {
                    required: '* Description is required.',
                  })}
                  defaultValue={postQuery.description}
                ></textarea>

                {/* <PostDropDownFilter />
                <PostDropDownFilter /> */}

                <p className='edit-post-page-description-error-validation'>
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div className='edit-post-page-button-wrapper'>
              {/* --- radio button --- */}
              {/* <div className='edit-post-page-radio-button-container'>
                <input
                  id='input-linked'
                  type='radio'
                  name='input-radio-button'
                  checked={clickedRadio}
                  onChange={handleRadioClick}
                  className='edit-post-input-radio-button'
                />
                <label
                  htmlFor='input-linked'
                  className='edit-post-input-radio-button-label'
                >
                  Restrict my post to viewers over 18
                </label>
              </div> */}

              {/* --- button --- */}
              <div className='post-information-sendButton'>
                <FormButton
                  buttonName={isCreatePost ? 'Create' : 'Repost'}
                  // className="create-post-custom-button"
                />
                {!isCreatePost && (
                  <img
                    src={Trash}
                    alt='Image-Trash-Icon'
                    onClick={handleClickModal}
                    className='edit-post-page-trash-icon'
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </form>
      <ChakraModal
        title='Are you sure to delete this post?'
        cancelButtonText='Back'
        approveButtonText='Delete'
        approveCallback={handleClickDelete}
        isModalOpen={isOpen}
        closeModalFunc={onClose}
      />
    </div>
  );
};

export default EditPostPage;
