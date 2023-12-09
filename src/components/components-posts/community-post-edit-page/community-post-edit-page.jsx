import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import userInfoQueryStore from '../../../userStore';
import { uploadToS3 } from '../../../services/s3-client';
import {
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react';

// components
import FormButton from '../../components-posts/community-post-button/community-post-button';
// import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestPost } from '../../../hooks/useApiRequestPost';
import useUploadImg from '../../../hooks/useUploadImg';

// scss
import './community-post-edit-page.scss';

// images
import createPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';
import Trash from '../../../assets/post/trash_icon.svg';
import DeleteButton from '../../../assets/post/thumbnail_delete.png';

import usePostQueryStore from '../../../postStore';
import { Toast, useToast } from '@chakra-ui/react';
// import { set } from 'date-fns';

const EditPostPage = () => {
  const {
    selectedFiles,
    setSelectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    resetFiles,
  } = useUploadImg();

  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [clickedRadio, setClickedRadio] = useState(false); // restrict over 18
  const [clickedThumbnailIndex, setClickedThumbnailIndex] = useState(null); // thumbnail click masking
  const [selectedImage, setSelectedImage] = useState(null); // display in big image

  const postQuery = usePostQueryStore((state) => state.postQuery);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  // console.log("EditPostPage", postQuery);

  // refs
  const fileInputRef = useRef(null);

  const navigate = useNavigate();
  const toast = useToast();

  // chakura ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  // setSelectedFiles(postQuery.pictures || []);
  // setSelectedFiles([
  //   "https://charm-post-img.s3.us-west-1.amazonaws.com/1701395754743-Screenshot+2023-11-07+at+8.31.42+PM.png",
  // ]);
  // }, [postQuery.pictures]);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: postQuery.title,
      description: postQuery.description,
    },
  });

  const hanldeClickModal = () => {
    console.log('clicked');
    onOpen();
  };

  // api
  const { mutate: apiMutate } = useApiRequestPost({
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

  // back button
  const handleClickCreatePostBack = () => {
    navigate('/edit-post');
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

  const displayImage =
    selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : null;

  // radio button
  const handleRadioClick = () => {
    setClickedRadio((prevState) => !prevState);
  };

  // thumbnail click masking
  const handleClickMask = (index) => {
    console.log(`Thumbnail index ${index} is clicked!!!!!!!!!!!`);
    setClickedThumbnailIndex(index === clickedThumbnailIndex ? null : index);
    setSelectedImage(selectedFiles[index]);
  };

  // thumbnail
  const displayThumbnails =
    selectedFiles.length > 0
      ? selectedFiles.map((file, index) => (
          <div key={index} className='edit-post-page-thumbnail'>
            <div
              className={`thumbnail ${
                index === clickedThumbnailIndex ? 'clicked' : ''
              }`}
              onClick={() => handleClickMask(index)}
            >
              <img
                src={URL.createObjectURL(file)}
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
              onClick={() => handleDeleteThumbnail(index)}
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
                className='create-edit-post-page-delete-button'
                style={{}}
              />
            </button>
          </div>
        ))
      : null;

  // delete thumbnail
  const handleDeleteThumbnail = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  // initial display image set up
  useEffect(() => {
    if (selectedFiles.length > 0) {
      setSelectedImage(selectedFiles[0]);
      setClickedThumbnailIndex(0);
    }
  }, [selectedFiles]);

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
          <span className='edit-post-page-label-back-button'>Edit a post</span>
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
            {displayImage && selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                style={{
                  marginBottom: '20px',
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                  </div>
                </div>
              </>
            )}

            {/* thumbnail */}
            <div className='edit-post-page-thumbnail-container'>
              {displayThumbnails}

              {/* thumbnail create */}
              {displayThumbnails && (
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
            <div>
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
              <div className='edit-post-page-radio-button-container'>
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
              </div>

              {/* --- button --- */}
              <div className='post-information-sendButton'>
                <FormButton
                  buttonName='Repost'
                  className='create-post-custom-button'
                />
                <img
                  src={Trash}
                  alt='Image-Trash-Icon'
                  style={{
                    width: '48px',
                    height: '48px',
                  }}
                  onClick={hanldeClickModal}
                />
              </div>
            </div>
          </div>
        </div>
      </form>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor='transparent' boxShadow='none'>
          <ModalHeader color='#ffffff' fontSize='25px'>
            Are you sure to delete this post?
          </ModalHeader>
          <ModalFooter display='flex' justifyContent='space-between'>
            <Button
              color='#ffffff'
              backgroundColor='#675f5a'
              outline='none'
              _hover='none'
              mr={3}
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              color='#ffffff'
              backgroundColor='#f1a285'
              outline='none'
              _hover='none'
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditPostPage;
