import React, { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import userInfoQueryStore from '../../../userStore';
import { uploadToS3 } from '../../../services/s3-client';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
} from '@chakra-ui/react';
// import { useDisclosure } from '@chakra-ui/react';

// scss
import './community-post-create-page.scss';

// components
import FormButton from '../../components-posts/community-post-button/community-post-button';
import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestPost } from '../../../hooks/useApiRequestPost';
// import { useAddPost } from '../../../hooks/useAddingPost';

// images
import createPostIcon from '../../../assets/post/create-post-icon.png';
import Arrow from '../../../assets/post/iconoir_arrow-right.svg';

const CreatePostPage = () => {
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const [clickedRadio, setClickedRadio] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  const navigate = useNavigate();

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
    navigate('/posts');
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

  const displayImage =
    selectedFiles.length > 0 ? URL.createObjectURL(selectedFiles[0]) : null;

  const displayThumbnails =
    selectedFiles.length > 1
      ? selectedFiles.slice(1, 4).map((file, index) => (
          <img
            key={index}
            src={URL.createObjectURL(file)}
            style={{
              width: '70px',
              height: '70px',
              marginRight: '5px',
            }}
            alt={`Thumbnail ${index + 1}`}
          />
        ))
      : null;

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

  return (
    <div>
      {alert.show && (
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
      )}
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
            className='arrow-back-button'
          />
          <span className='create-post-page-back-button'>Create a post</span>
        </button>

        <div className='create-post-page-inner-container'>
          <div className='create-post-page-left-container-wrapper'>
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
                <div className='left-container'>
                  <div
                    className='create-post-page-add'
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
                  <div className='create-post-page-text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                  </div>
                </div>
              </>
            )}

            <div className='create-post-page-thumbnails'>
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
            </div>
          </div>

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
      </form>
    </div>
  );
};

export default CreatePostPage;
