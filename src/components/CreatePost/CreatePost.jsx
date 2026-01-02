import React from "react"
import { useState } from "react";

const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"

export default function CreatePost() {

  const [isModelOpened, setIsModelOpened] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  const isImageSelected = !!imagePreview;

  function handleOpenModel() {
    handleClearImage()
    setIsModelOpened(true);
  }
  function handleCloseModel() {
    setIsModelOpened(false);

  }
  function handleClearImage() {
    setImagePreview(null);
    // Reset the file input so the same file can be selected again

  }

  function handleImageChange(e) {

    console.log("image",e.target.files["0"]);
    //it is JavaScript """ URL.createObjectURL"""  function that creates a temporary URL for the selected file
    const imageUrl = URL.createObjectURL(e.target.files[0]);

    setImagePreview(imageUrl);
  }

  function handleCreatePost() {
    console.log("Post is creatingggggg");
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

          {/* <button
            className="absolute end-1.5 bottom-1.5 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 font-medium rounded-lg text-xs px-4 py-2 transition-colors"
          >
            Comment
          </button> */}
        </div>}


      {isModelOpened && <div className="flex flex-col gap-3">

        {/* Caption for post ==>input / what's in your mind */}
        <input
          type="text"
          id="search"
          className="w-full p-3 pr-24 bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500"
          placeholder="What's in your  mind.." />

        {/* Upload Image for post */}
        {isImageSelected && <div className="relative">
          <img src={imagePreview} alt="Post preview" className="w-full h-96 rounded-lg" />
          <div onClick={handleClearImage} className="absolute top-3 right-3 bg-red-500 rounded-lg p-4 text-white w-5 h-5 flex items-center justify-center cursor-pointer">
            <i  className="fa-solid fa-x"></i>
          </div>
        </div>}

        {/* Buttons for post */}
        <div className="flex justify-between items-center">

          <label className="cursor-pointer text-white hover:text-blue-500 duration-300">
            
            <input onChange={handleImageChange} type="file" className="hidden" />

            <div className="flex items-center gap-2">
              <span className="text-sm text-white">Upload</span>
            </div>
          </label>

          <div className="flex items-center gap-2">
            <button onClick={handleCloseModel} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Cancel</button>
            <button onClick={handleCreatePost} className="bg-blue-500 text-white px-4 py-2 rounded-lg">Post</button>
          </div>

        </div>

      </div>}

    </div>

  )
}

