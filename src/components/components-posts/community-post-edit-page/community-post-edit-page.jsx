import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import userInfoQueryStore from "../../../userStore";
import { uploadToS3 } from "../../../services/s3-client";
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
} from "@chakra-ui/react";

// components
import FormButton from "../../components-posts/community-post-button/community-post-button";
// import PostDropDownFilter from '../community-post-dropdown-filter/community-post-dropdown-filter';

// hook
import { useApiRequestPost } from "../../../hooks/useApiRequestPost";
import useUploadImg from "../../../hooks/useUploadImg";
import { useApiRequestEditPost } from "../../../hooks/useApiRequestPost";

// scss
import "./community-post-edit-page.scss";

// images
import createPostIcon from "../../../assets/post/create-post-icon.png";
import Arrow from "../../../assets/post/iconoir_arrow-right.svg";
import Trash from "../../../assets/post/trash_icon.svg";
import DeleteButton from "../../../assets/post/thumbnail_delete.png";

import usePostQueryStore from "../../../postStore";
import { Toast, useToast } from "@chakra-ui/react";
import { set } from "date-fns";

const EditPostPage = () => {
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
  const { mutate: apiMutateEditPost, data } = useApiRequestEditPost({});

  const [clickedRadio, setClickedRadio] = useState(false);
  // const [selectedFiles, setSelectedFiles] = useState([]);

  const postQuery = usePostQueryStore((state) => state.postQuery);
  const userInfo = userInfoQueryStore((state) => state.userInfo);
  // console.log("EditPostPage", postQuery);

  // refs
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

  // chakura ui modal
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setUploadedFiles(postQuery.pictures);
  }, [postQuery.pictures]);

  // react hook form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: postQuery.title,
      description: postQuery.description,
    },
  });

  const onSubmit = (data) => {
    console.log("submit in edit post", data);
    const formData = {
      address: "",
      brief: data.description,
      coverImg: "",
      id: postQuery.userID,
      isDisplay: 0,
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
      userId: postQuery.userID,
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
    apiMutateEditPost(formData);
  };
  useEffect(() => {
    // console.log("data::", data);
    if (data?.code === 100) {
      resetFiles();
      reset({
        title: "",
        description: "",
      });
      toast({
        title: "Repost successfully.",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    }
    if (data?.code === 500) {
      toast({
        title: "Failed to create post.",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [data, toast]);

  // back button
  const handleClickCreatePostBack = () => {
    navigate("/edit-post");
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

  // thumbnail
  const displayThumbnails =
    uploadedFiles.length > 0
      ? uploadedFiles.map((file, index) => (
          <div key={index} className="create-edit-post-page-thumbnail">
            <div className={`thumbnail ${index < 2 ? "mask-effect" : ""}`}>
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
                className="create-edit-post-page-delete-button"
                style={{}}
              />
            </button>
          </div>
        ))
      : null;
  const displayImage = uploadedFiles.length > 0 ? uploadedFiles[0] : null;

  // delete thumbnail
  const handleDeleteThumbnail = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="edit-post-page-container"
      >
        <div className="pink-background-1"></div>
        <div className="pink-background-2"></div>

        <button
          type="button"
          onClick={handleClickCreatePostBack}
          className="edit-post-page-back-button-container"
        >
          <img
            src={Arrow}
            alt="Image-Arrow-Icon"
            className="edit-post-page-arrow-back-button"
          />
          <span className="edit-post-page-back-button">Edit a post</span>
        </button>

        <div className="edit-post-page-inner-container">
          <div className="edit-post-page-left-container-wrapper">
            <input
              ref={fileInputRef}
              type="file"
              id="imageUpload"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelection}
              multiple
            />
            {displayImage && selectedImage ? (
              <img
                src={URL.createObjectURL(selectedImage)}
                style={{
                  marginBottom: "20px",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  width: "330px",
                  height: "330px",
                  objectFit: "contain",
                }}
                alt="Selected"
              />
            ) : (
              <>
                <div className="edit-post-page-left-container">
                  <div
                    className="edit-post-page-add"
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
                  <div className="edit-post-page-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing
                  </div>
                </div>
              </>
            )}

            {/* thumbnail */}
            <div className="create-edit-post-page-thumbnail-container">
              {displayThumbnails}

              {/* thumbnail create */}
              {displayThumbnails && (
                <div
                  className="edit-post-page-add-thumbnail"
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onClick={handleBrowseFiles}
                >
                  <img
                    src={createPostIcon}
                    style={{
                      width: "60px",
                      height: "60px",
                    }}
                    alt="Image-Create-Post"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="edit-post-page-right-container">
            <div>
              <input
                type="text"
                placeholder="Title"
                className="edit-post-page-title"
                {...register("title", {
                  required: "* Title is required.",
                  maxLength: {
                    value: 20,
                    message: "* Maximum limit for characters is 20.",
                  },
                })}
                defaultValue={postQuery.title}
              />
              <p className="edit-post-page-title-error-validation">
                {errors.title?.message}
              </p>

              <div className="description-container">
                <textarea
                  name="brief"
                  id="description"
                  placeholder="Description"
                  className="edit-post-page-description"
                  {...register("description", {
                    required: "* Description is required.",
                  })}
                  defaultValue={postQuery.description}
                ></textarea>

                {/* <PostDropDownFilter />
                <PostDropDownFilter /> */}

                <p className="edit-post-page-description-error-validation">
                  {errors.description?.message}
                </p>
              </div>
            </div>

            <div className="edit-post-page-button-wrapper">
              {/* --- radio button --- */}
              <div className="edit-post-page-radio-button-container">
                <input
                  id="input-linked"
                  type="radio"
                  name="input-radio-button"
                  checked={clickedRadio}
                  onChange={handleRadioClick}
                  className="edit-post-input-radio-button"
                />
                <label
                  htmlFor="input-linked"
                  className="edit-post-input-radio-button-label"
                >
                  Restrict my post to viewers over 18
                </label>
              </div>

              {/* --- button --- */}
              <div className="post-information-sendButton">
                <FormButton
                  buttonName="Repost"
                  className="create-post-custom-button"
                />
                <img
                  src={Trash}
                  alt="Image-Trash-Icon"
                  style={{
                    width: "48px",
                    height: "48px",
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
        <ModalContent backgroundColor="transparent" boxShadow="none">
          <ModalHeader color="#ffffff" fontSize="25px">
            Are you sure to delete this post?
          </ModalHeader>
          <ModalFooter display="flex" justifyContent="space-between">
            <Button
              color="#ffffff"
              backgroundColor="#675f5a"
              outline="none"
              _hover="none"
              mr={3}
              onClick={onClose}
            >
              Back
            </Button>
            <Button
              color="#ffffff"
              backgroundColor="#f1a285"
              outline="none"
              _hover="none"
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
