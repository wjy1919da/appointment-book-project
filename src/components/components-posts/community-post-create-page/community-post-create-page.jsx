import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import userInfoQueryStore from "../../../userStore";
import usePostQueryStore from "../../../postStore";
// import { useDisclosure } from '@chakra-ui/react';

// components
import FormButton from "../../components-posts/community-post-button/community-post-button";
// import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestPost } from "../../../hooks/useApiRequestPost";
import useUploadImg from "../../../hooks/useUploadImg";

// scss
import "./community-post-create-page.scss";

// images
import createPostIcon from "../../../assets/post/create-post-icon.png";
import Arrow from "../../../assets/post/iconoir_arrow-right.svg";
import DeleteButton from "../../../assets/post/thumbnail_delete.png";

const CreatePostPage = () => {
  const toast = useToast();

  // call api hooks
  const {
    selectedFiles,
    setSelectedFiles,
    handleFileSelection,
    uploadProgress,
    isLoading,
    isError,
    uploadedFiles,
    resetFiles,
    removeUploadedFile,
  } = useUploadImg();
  const {
    mutate: apiMutate,
    data,
    isSuccess: createPostSuccess,
    isError: createPostError,
  } = useApiRequestPost({
    onError: (error) => {
      toast({
        title: "Failed to create post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    },
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const refreshMyPost = usePostQueryStore((state) => state.refreshMyPost);
  const [clickedThumbnailIndex, setClickedThumbnailIndex] = useState(
    uploadedFiles.length - 1 || 0
  ); // thumbnail click masking
  const [clickedRadio, setClickedRadio] = useState(false);
  const fileInputRef = useRef(null);
  const userInfo = userInfoQueryStore((state) => state.userInfo);

  const navigate = useNavigate();
  const location = useLocation();

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => {
    const displayImage =
      selectedImage || (uploadedFiles.length > 0 ? uploadedFiles[0] : null);

    // const displayImage = uploadedFiles.length > 0 ? uploadedFiles[0] : null;

    // console.log("data::", data, displayThumbnails, uploadedFiles);
    const formData = {
      address: "",
      brief: data.description,
      coverImg: displayImage,
      isDisplay: 1,
      lat: "",
      location: "",
      lon: "",
      pictures: uploadedFiles,
      tags: [
        {
          tagId: 0,
          tagName: "",
        },
      ],
      title: data.title,
    };
    if (!userInfo?.token) {
      toast({
        title: "Please login first.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    apiMutate(formData);
  };

  useEffect(() => {
    if (createPostSuccess) {
      resetFiles();
      reset({
        title: "",
        description: "",
      });
      toast({
        title: "Post created successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      refreshMyPost();
      localStorage.getItem("accountType") === "2"
        ? navigate("/doctorProfile/#Posts")
        : navigate("/userProfile");
    }
    if (createPostError) {
      toast({
        title: "Failed to create post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [createPostSuccess, createPostError, toast]);

  useEffect(() => {
    if (uploadedFiles.length > 0) {
      setSelectedImage(uploadedFiles[uploadedFiles.length - 1]);
    }
  }, [uploadedFiles]);

  // back button
  const handleClickCreatePostBack = () => {
    const source = location.state?.source;

    if (source === "userProfile") {
      navigate("/userProfile/#Posts");
    } else if (source === "doctorProfile") {
      navigate("/doctorProfile/#Posts");
    } else {
      navigate("/posts");
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
    // console.log('clicked');
    setSelectedImage(uploadedFiles[index]);
    // setClickedThumbnailIndex(index);
    setClickedThumbnailIndex((prevIndex) =>
      prevIndex === index ? null : index
    );
  };

  // thumbnail
  const displayThumbnails =
    uploadedFiles.length > 0
      ? uploadedFiles.map((file, index) => (
          <div key={index} className="create-post-page-thumbnail">
            <div
              className={`thumbnail ${selectedImage === file ? "clicked" : ""}`}
              onClick={() => handleClickMask(index)}
            >
              <img
                src={file}
                alt={`Selected Thumbnail ${index + 1}`}
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            </div>
            <button
              type="button"
              className="delete-thumbnail-button"
              onClick={() => removeUploadedFile(index)}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "#A5A6A7",
                borderRadius: "50%",
                position: "absolute",
                top: "-5px",
                right: "-5px",
              }}
            >
              <img
                src={DeleteButton}
                alt="Icon-Delete-Button"
                className="create-post-page-delete-button"
              />
            </button>
          </div>
        ))
      : null;

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="create-post-page-container"
      >
        <div className="pink-background-1"></div>
        <div className="pink-background-2"></div>

        <button
          type="button"
          onClick={handleClickCreatePostBack}
          className="create-post-page-back-button-container"
        >
          <img
            src={Arrow}
            alt="Image-Arrow-Icon"
            className="create-post-page-arrow-back-button"
          />
          <span className="create-post-page-label-back-button">
            Create a post
          </span>
        </button>

        <div className="create-post-page-inner-container">
          <div className="create-post-page-wrapper">
            <input
              ref={fileInputRef}
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelection}
              multiple
            />
            {/* {displayImage && selectedImage ? ( */}
            <div className="create-post-pic-wrapper">
              {uploadedFiles.length > 0 ? (
                <img
                  src={selectedImage}
                  style={{
                    marginBottom: "20px",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    width: "330px",
                    height: "330px",
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                    objectFit: "contain",
                  }}
                  alt="Selected"
                />
              ) : (
                <>
                  <div className="create-post-page-left-container">
                    <div
                      className="create-post-page-add"
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={handleBrowseFiles}
                    >
                      <img
                        src={createPostIcon}
                        style={{
                          width: "157px",
                          height: "157px",
                        }}
                        alt="Image-Create-Post"
                      />
                    </div>
                    <div className="create-post-page-text">
                      Lorem ipsum dolor sit amet, consectetur adipiscing
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* thumbnail */}
            <div className="create-post-page-thumbnail-container">
              {displayThumbnails}

              {/* create thumbnail */}
              {displayThumbnails && uploadedFiles.length < 3 && (
                <div
                  className="create-post-page-add-thumbnail"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleBrowseFiles}
                >
                  {/* <div className='create-post-image-wrapper'> */}
                  <img
                    src={createPostIcon}
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                    alt="Image-Create-Post"
                  />
                  {/* </div> */}
                </div>
              )}
            </div>
          </div>

          <div className="create-post-page-right-container">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="create-post-page-title"
                {...register("title", {
                  required: "* Title is required.",
                  maxLength: {
                    value: 20,
                    message: "* Maximum limit for characters is 20.",
                  },
                })}
              />

              <p className="create-post-page-title-error-validation">
                {errors.title?.message}
              </p>

              <div className="create-post-page-description-container">
                <textarea
                  name="brief"
                  id="description"
                  placeholder="Description"
                  className="create-post-page-description"
                  {...register("description", {
                    required: "* Description is required.",
                  })}
                ></textarea>

                {/* <PostDropDownFilter /> */}
                {/* <PostDropDownFilter /> */}

                <p className="create-post-page-description-error-validation">
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div className="create-post-page-button-wrapper">
              {/* --- radio button --- */}
              <div className="create-post-page-radio-button-container">
                <input
                  id="input-linked"
                  type="radio"
                  name="input-radio-button"
                  checked={clickedRadio}
                  onChange={handleRadioClick}
                  className="create-post-input-radio-button"
                />
                <label
                  htmlFor="input-linked"
                  className="create-post-input-radio-button-label"
                >
                  Restrict my post to viewers over 18
                </label>
              </div>

              {/* --- button --- */}
              <div className="post-information-sendButton">
                <FormButton
                  buttonName="Post"
                  // className="create-post-custom-button"
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
