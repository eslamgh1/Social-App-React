import React, { useState } from "react";
import CommentCard from "../CommentCard/CommentCard";
import PostHeader from "../PostHeader/PostHeader";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function PostCard({ post, isSinglePost }) {
  const [commentFieldValue, setCommentFieldValue] = useState("");
  
  // 1. Initialize QueryClient at the top level (Fixes Hook Violation)
  const queryClient = useQueryClient();

  const user = post.user;
  const postHasImage = !!post.image;

  const firstComment = post.comments?.[0];
  const allCommentsReversed = structuredClone(post).comments?.reverse()

  

  // Use spread to reverse without mutating original data

  // Function to handle the API call
  function handleAddComment() {
    const commentData = {
      content: commentFieldValue,
      post: post.id
    };

    return axios.post("https://linked-posts.routemisr.com/comments", commentData, {
      headers: {
        token: localStorage.getItem('tkn')
      }
    });
  }

  // TanStack Query Mutation
  const { mutate, isPending } = useMutation({
    mutationFn: handleAddComment,
    onSuccess: () => {
      setCommentFieldValue(""); // Clear input on success
      
      // 2. Refresh the specific post data to show the new comment
      queryClient.invalidateQueries({
        queryKey: ['getSinglePost', post.id],
      });
      
      // Also refresh the main feed if this is not the single post view
      queryClient.invalidateQueries({
        queryKey: ['getAllPosts'],
      });
    },
    onError: (err) => {
      console.error("Mutation Error:", err);
    }
  });

  return (
    <div className="bg-amber-100 rounded-lg p-5 mb-4">
      <PostHeader name={user.name} photo={user.photo} createdAt={post.createdAt} />

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