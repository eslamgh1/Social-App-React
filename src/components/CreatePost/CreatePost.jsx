import React, { useRef } from "react"
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"


export default function CreatePost() {

  const [isModelOpened, setIsModelOpened] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const captionInputElement = useRef(null);
  const imageInputElement = useRef(null);

  const isImageSelected = !!imagePreview;
  const queryClient = useQueryClient(); // triger post list refresh // to update the post list after creating a new post

  // handle post creation & post methods
  const {  isPending, isError , mutate: triggerHandleCreatePost} = useMutation({
    mutationFn: handleCreatePost,
    onSuccess: function (res) {
      console.log("Post created successfully:", res);
      handleCloseModel();
      queryClient.invalidateQueries(['getPosts']);
    },
    onError: function (error) {
      console.error("Error creating post:", error);
    }
  });

  function handleOpenModel() {
    setIsModelOpened(true);
  }
  function handleCloseModel() {
    handleClearImage();
    setIsModelOpened(false);

  }
  function handleClearImage() {
    setImagePreview(null);
    imageInputElement.current.value = ""; //  Reset the file input so the same file can be selected again
  }

  function handleImageChange(e) {
    // console.log("image", e.target.files["0"]);
    //it is JavaScript """ URL.createObjectURL"""  function that creates a temporary URL for the selected file
    const imageUrl = URL.createObjectURL(e.target.files[0]);

    setImagePreview(imageUrl);
  }

  function handleCreatePost() {
    // console.log("handleCreatePost:" , captionInputElement.current.value);
    const formDataObject = new FormData();

    if (captionInputElement.current.value) {
      formDataObject.append('body', captionInputElement.current.value);
    }

    if (imageInputElement.current.files?.[0]) {
      formDataObject.append('image', imageInputElement.current.files[0]);
    }

    console.log("FormData:", formDataObject);

    return axios.post("https://linked-posts.routemisr.com/posts", formDataObject, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    })
  }



  return (

    <div className="p-5 mx-auto my-3 w-full rounded-2xl shadow-lg">
      {!isModelOpened &&
        <div onClick={handleOpenModel} className="toggler">
          <input
            type="text"
            id="search"
            className="block w-full p-3 pr-24 bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
            placeholder="What's in your  mind.."
          />
        </div>}


      {isModelOpened && <div className="flex flex-col gap-3">

        {/* Caption for post ==>input / what's in your mind */}
        <input
          ref={captionInputElement}
          type="text"
          id="search"
          className="w-full p-3 pr-24 bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="What's in your  mind.." />

        {/* Display Image for post */}
        {isImageSelected && <div className="relative">
          <img src={imagePreview} alt="Post preview" className="w-full h-96 rounded-lg" />
          <div onClick={handleClearImage} className="absolute top-3 right-3 bg-red-500 rounded-lg p-4 text-white w-5 h-5 flex items-center justify-center cursor-pointer">
            <i className="fa-solid fa-x"></i>
          </div>
        </div>}

        {/* Buttons for post */}
        <div className="flex justify-between items-center">

          <label className="cursor-pointer text-white hover:text-blue-500 duration-300">

            <input onChange={handleImageChange} ref={imageInputElement} type="file" className="hidden" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-white">Upload</span>
            </div>
          </label>

          <div className="flex items-center gap-2">
            <button disabled={isPending} onClick={handleCloseModel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
            <button disabled={isPending} onClick={triggerHandleCreatePost} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
              {isPending ? 'Posting...' : 'Post'}
            </button>
          </div>

        </div>

      </div>}

    </div>

  )
}


