import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react"
import { useState } from "react";

export default function usePostCard(post) {


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

  return{
    commentFieldValue, setCommentFieldValue, mutate, isPending, user, postHasImage, firstComment, allCommentsReversed
  }

}

