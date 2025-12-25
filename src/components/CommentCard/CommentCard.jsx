import React from "react"
import PostHeader from "../PostHeader/PostHeader"

export default function CommentCard({ commentDetails }) {

  console.log({ commentDetails })

  const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"

  return (

    <>
      <div className="">
        {/* <div className="comment-part bg-blue-400">
          <div className="comment flex justify-between">
            <div className="left-part flex ">
              <img onError={(e) => { e.target.onerror = null; e.target.src = STATIC_USER_IMAGE }} src={commentDetails.commentCreator.photo} className="w-10 h-10 rounded-full" alt={commentDetails.commentCreator.name} />
              <div className="info">
                <h5>{commentDetails.commentCreator.name}</h5>
                <p>{commentDetails.createdAt}</p>
              </div>
            </div>
            <div className="right-part bg-red-200">
              <i class="fa-solid fa-ellipsis"></i>
            </div>
          </div>
          <p>{commentDetails.content}</p>
        </div> */}

        <PostHeader name={commentDetails.commentCreator.name} photo={commentDetails.commentCreator.photo} createdAt={commentDetails.createdAt}/>
        <p>{commentDetails.content}</p>
      </div>

    </>

  )
}

