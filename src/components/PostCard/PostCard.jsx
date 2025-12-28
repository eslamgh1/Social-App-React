import React, { useState } from "react"
import CommentCard from "../CommentCard/CommentCard"
import PostHeader from "../PostHeader/PostHeader"
import { Link } from "react-router-dom"
import axios from "axios"
import { FadeLoader } from "react-spinners"
// import CommendCard from "../CommendCard/CommendCard"
// import PostHeader from "../CommendCard/CommendCard"


export default function PostCard({ post, isSinglePost }) {
  const [commentFieldValue, setCommentFieldValue] = useState("")
  const [isLoading, setIsLoading] =useState(false)

  const user = post.user
  const firstComment = post.comments?.[0]
  const postHasImage = !!post.image
  // const STATIC_USER_IMAGE = "https://ui-avatars.com/api/?name"
  const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"




  //This is a Function Declaration.
  function handleAddComment() {
    setIsLoading(true)

    const commentData = {
      content: commentFieldValue,
      post: post.id
    }

    axios.post("https://linked-posts.routemisr.com/comments", commentData, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    }).then(function (x) {
      console.log("handleAddComment",x.data)
      setCommentFieldValue("") // to clear the comment of user in success 
    })
      .catch(function (err) {
        console.log("err",err)

      }).finally(function(){
        setIsLoading(false)
      })
  }

  return (
    <div className="bg-amber-100 rounded-lg p-5">
      <PostHeader name={user.name} photo={user.photo} createdAt={post.createdAt} />

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



      <label for="search" class="block mb-2.5 text-sm font-medium text-heading sr-only ">Search</label>
      <div className="relative my-2">

        <input value={commentFieldValue} onChange={(e) => { setCommentFieldValue(e.target.value) }} type="search" id="search" class="block w-full p-3 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Add your comment...." required />
        <button onClick={handleAddComment} disabled={isLoading} type="submit" class="cursor-pointer absolute end-1.5 bottom-1.5 text-white bg-brand hover:bg-brand-strong box-border border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded text-xs px-3 py-1.5 focus:outline-none">
           {isLoading ? <FadeLoader /> : "Comment"}
          </button>
      </div>



      {/* // Passing Params via Props (The "React Way") Define the Route */}
      {!isSinglePost && <Link to={`/postdetails/${post.id}`} className="text-center text-blue-600 font-bold block">
        view more comments...
      </Link>}
      {isSinglePost && post.comments?.map(Comment => <CommentCard commentDetails={Comment} />)}

      {!isSinglePost && firstComment && <CommentCard commentDetails={firstComment} />}



    </div>
  )
}

