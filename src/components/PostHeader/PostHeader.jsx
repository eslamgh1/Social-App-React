import { Dropdown, DropdownItem } from "flowbite-react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { authContext } from "../../context/authContext";

export default function PostHeader({ photo, name, createdAt, postUserId, isPostPart = false }) {
  const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"

  const { userId } = useContext(authContext)
  function deletePost(id) {
    return axios.delete(`https://linked-posts.routemisr.com/posts/${id}`, {
      headers: {
        token: localStorage.getItem("tkn"),
      },
    })
  }

  function deleteComment(id) {
    return axios.delete(`https://linked-posts.routemisr.com/comments/${id}`, {
      headers: {
        token: localStorage.getItem("tkn"),
      },
    })
  }

  const { isPending, mutate: handleDeletePost } = useMutation({
    mutationFn: isPostPart ? deletePost : deleteComment,
    onSuccess: function (res) {
      console.log({ res })
    },
    onError: function (err) {
      console.log({ err })
    }
  })

  return (
    <>
      <div className="post-header flex justify-between">
        <div className="left-part flex ">
          <img onError={(e) => { e.target.onerror = null; e.target.src = STATIC_USER_IMAGE }} src={photo} className="w-10 h-10 rounded-full" alt={name} />
          {/* <img src={photo} className="w-10 h-10 rounded-full" alt={name} /> */}
          <div className="info">
            <h5>{name}</h5>
            <p>{createdAt}</p>
          </div>
        </div>
        {/* <div className="right-part "> */}
        {/* <i className="fa-solid fa-ellipsis"></i> */}
        {/* </div> */}

        {postUserId == userId && <Dropdown className="bg-sky-300 text-blue-950" label="..." dismissOnClick={true}>
          <DropdownItem onClick={handleDeletePost} className="text-amber-800 cursor-pointer rounded-full">Delete</DropdownItem>
          <DropdownItem className="text-amber-800 cursor-pointer rounded-full">Update</DropdownItem>
        </Dropdown>}

      </div>

    </>

  )
}

