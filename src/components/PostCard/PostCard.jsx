import React from "react"
import CommentCard from "../CommentCard/CommentCard"
import PostHeader from "../PostHeader/PostHeader"
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
      <PostHeader name={user.name} photo={user.photo} createdAt={post.createdAt}/>

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

      {firstComment && <CommentCard commentDetails={firstComment} />}



    </div>
  )
}

