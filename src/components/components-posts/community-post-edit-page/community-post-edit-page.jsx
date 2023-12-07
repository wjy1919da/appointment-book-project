import React, { useState, useRef } from 'react';
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
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/react';

// components
import FormButton from '../../components-posts/community-post-button/community-post-button';
// import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestPost } from '../../../hooks/useApiRequestPost';

// scss
import './community-post-edit-page.scss';

// images
import createPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';
import Trash from '../../../assets/post/trash_icon.svg';

const EditPostPage = () => {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [clickedRadio, setClickedRadio] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const navigate = useNavigate();

  const { isOpen, onOpen, onClose } = useDisclosure();

  // react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  // api
  const { mutate: apiMutate } = useApiRequestPost({
    onError: (error) => {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to create post.',
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
    if (!userInfo.username) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Please login to create post.',
      });
    }
    apiMutate(formData);
    setUploadingFiles([]);
  };

  // back button
  const handleClickCreatePostBack = () => {
    navigate('/edit-post');
  };

  const handleFileSelection = async (event) => {
    const newFiles = Array.from(event.target.files);
    setSelectedFiles(newFiles);
    console.log(`uploading ${newFiles.length} files...`);
    const uploadPromises = newFiles.map((file) => uploadToS3(file));
    try {
      const uploadResults = await Promise.all(uploadPromises);
      const successfulUploads = uploadResults
        .filter((result) => result.success)
        .map((result) => result.location);
      setUploadedFiles((prevFiles) => [...prevFiles, ...successfulUploads]);
      uploadResults.forEach((result) => {
        if (!result.success) {
          setAlert({ show: true, type: 'error', message: result.message });
        }
      });
      console.log('all the files uploaded successfully', uploadResults);
      // setAlert({
      //   show: true,
      //   type: "success",
      //   message: "All the files uploaded successfully.",
      // });
      setSelectedFiles([]);
    } catch (err) {
      setAlert({
        show: true,
        type: 'error',
        message: 'Failed to upload files.',
      });
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

  const displayImage =
    selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : null;

  // radio button
  const handleRadioClick = () => {
    setClickedRadio((prevState) => !prevState);
  };

  const testClick = () => {
    console.log('clicked');
    onOpen();
  };

  return (
    <div>
      {/* {alert.show && (
        <Alert
          status={alert.type}
          variant='solid'
          style={{
            zIndex: '100',
            position: 'fixed',
            top: '65px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AlertIcon />
            <AlertDescription>{alert.message}</AlertDescription>
          </div>
          <CloseButton onClick={() => setAlert({ ...alert, show: false })} />
        </Alert>
      )} */}
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
            className='edit-post-page-arrow-back-button'
          />
          <span className='edit-post-page-back-button'>Edit a post</span>
        </button>

        <div className='edit-post-page-inner-container'>
          <div className='edit-post-page-left-container-wrapper'>
            <input
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
                <div className='edit-post-page-left-container'>
                  <div
                    className='edit-post-page-add'
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onClick={handleBrowseFiles}
                  >
                    {selectedFiles.length > 0 && (
                      <img
                        src={URL.createObjectURL(selectedFiles[0])}
                        style={{
                          width: '70px',
                          height: '70px',
                        }}
                        className='test'
                        alt='Selected Thumbnail'
                      />
                    )}
                    <img
                      src={createPostIcon}
                      style={{
                        width: '157px',
                        height: '157px',
                      }}
                      alt='Image-Create-Post'
                    />
                    <input
                      type='file'
                      ref={fileInputRef}
                      onChange={handleFileSelection}
                      multiple
                      style={{ display: 'none' }}
                    />
                  </div>
                  <div className='edit-post-page-text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                  </div>
                </div>
              </>
            )}

            {/* <div className='create-post-page-thumbnails'>
              {selectedFiles.length > 0 && (
                <>
                  <img
                    src={URL.createObjectURL(selectedFiles[0])}
                    style={{
                      width: '70px',
                      height: '70px',
                      marginRight: '5px',
                    }}
                    alt='Selected Thumbnail'
                  />
                  {displayThumbnails}
                </>
              )}
            </div> */}
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
                  onClick={testClick}
                  style={{
                    width: '48px',
                    height: '48px',
                  }}
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
