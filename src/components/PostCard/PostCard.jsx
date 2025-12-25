import React from "react"
// import CommendCard from "../CommendCard/CommendCard"
// import PostHeader from "../CommendCard/CommendCard"


export default function PostCard({ post }) {

  const user = post.user
  const firstComment = post.comments?.[0]
  const postHasImage = !!post.image
  // const STATIC_USER_IMAGE = "https://ui-avatars.com/api/?name"
  const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"


  return (
    <div className="bg-amber-100 rounded-lg p-5">
      <div className="post-header flex justify-between">
        <div className="left-part flex ">
          <img src={post.user.photo} className="w-10 h-10 rounded-full" alt={post.user.name} />
          <div className="info">
            <h5>{post.user.name}</h5>
            <p>{post.createdAt}</p>
          </div>
        </div>
        <div className="right-part bg-red-200">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>

      <div className="post-content">
        <p>{post.body}</p>
        {/* Conditional Rendering */}
        {postHasImage && <img src={post.image} className="w-full" alt="post.body" />}
      </div>

      <div className="post-footer bg-amber-400 flex justify-around">
        <div>
          <i class="fa-solid fa-thumbs-up"></i>
          <h5>Like </h5>
        </div>
        <div>
          <i class="fa-regular fa-comment"></i>
          <h5>Comment </h5>
        </div>
        <div>
          <i class="fa-solid fa-share"></i>
          <h5>Share </h5>
        </div>
      </div>

      <div className="comment-part bg-blue-400">
        <div className="comment flex justify-between">
          <div className="left-part flex ">
            <img onError={(e)=>{e.target.onerror = null ; e.target.src =STATIC_USER_IMAGE}} src={firstComment.commentCreator.photo} className="w-10 h-10 rounded-full" alt={firstComment.commentCreator.name} />
            <div className="info">
              <h5>{firstComment.commentCreator.name}</h5>
              <p>{firstComment.createdAt}</p>
            </div>
          </div>
          <div className="right-part bg-red-200">
            <i class="fa-solid fa-ellipsis"></i>
          </div>
        </div>

        <p>First comment here.............</p>
      </div>

    </div>
  )
}

