import React, { useState } from "react";
import CommentCard from "../CommentCard/CommentCard";
import PostHeader from "../PostHeader/PostHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import usePostCard from "./usePostCard";

export default function PostCard({ post, isSinglePost = false }) {

  const {commentFieldValue, setCommentFieldValue, mutate, isPending, user, postHasImage, firstComment, allCommentsReversed} = usePostCard(post)
  return (
    <div className="bg-amber-100 rounded-lg p-5 mb-4">
      <PostHeader isPostPart={true} name={user.name} photo={user.photo} createdAt={post.createdAt} postUserId={user._id} />

      <div className="post-content my-3">
        <p className="mb-2">{post.body}</p>
        {postHasImage && (
          <img src={post.image} className="w-full rounded-md" alt="Post content" />
        )}
      </div>

      <div className="post-footer bg-amber-400 p-2 rounded-md flex justify-around">
        <div className="flex items-center gap-1 cursor-pointer">
          <i className="fa-solid fa-thumbs-up"></i>
          <span className="font-medium">Like</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <i className="fa-regular fa-comment"></i>
          <span className="font-medium">Comment</span>
        </div>
        <div className="flex items-center gap-1 cursor-pointer">
          <i className="fa-solid fa-share"></i>
          <span className="font-medium">Share</span>
        </div>
      </div>

      {/* Input Section */}
      <div className="relative my-4">
        <label htmlFor="search" className="sr-only">Add Comment</label>
        <input 
          value={commentFieldValue} 
          onChange={(e) => setCommentFieldValue(e.target.value)} 
          type="text" 
          id="search" 
          className="block w-full p-3 pr-24 bg-white border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500" 
          placeholder="Add your comment...." 
        />
        <button 
          onClick={mutate} 
          disabled={isPending || !commentFieldValue.trim()} 
          className="absolute end-1.5 bottom-1.5 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 font-medium rounded-lg text-xs px-4 py-2 transition-colors"
        >
          {isPending ? <FadeLoader color="#ffffff" height={5} width={2} radius={1} margin={-10} /> : "Comment"}
        </button>
      </div>

      {/* Comments Logic */}
      {!isSinglePost && (
        <Link to={`/postdetails/${post.id}`} className="text-center text-blue-600 font-bold block mb-3 hover:underline">
          view more comments...
        </Link>
      )}

      {/* Show all comments if in Single Post view */}
      {isSinglePost && allCommentsReversed.map(comment => (
        <CommentCard key={comment._id} commentDetails={comment} />
      ))}

      {/* Show only the first comment if in Feed view */}
      {!isSinglePost && firstComment && (
        <CommentCard commentDetails={firstComment} />
      )}
    </div>
  );
}