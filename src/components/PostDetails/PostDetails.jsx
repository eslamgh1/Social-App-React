import React from "react"
import PostCard from "../PostCard/PostCard"
import {useParams} from "react-router-dom"
import { useQuery } from "@tanstack/react-query";
import Spinner from "../Spinner/Spinner"
import axios from "axios";


export default function PostDetails() {

  const {id} = useParams();

// test id: 68e2a72a8c0ff7c015ca9689
      function getPostDetails() {
        return axios.get(`https://linked-posts.routemisr.com/posts/${id}`, {
            headers: {
                token: localStorage.getItem("tkn"),
            },
        });
    }

    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['getSinglePost', id], // Initial data fetch for posts from API
        queryFn: getPostDetails, // fn must return promise like axios
        // refetchInterval: 1000 * 60 * 60 * 24 // input by millisecond to day
    });
    

    // It is nesseccary to aavoid: Cannot read properties of undefined (reading 'data')
    if (isLoading){
        return <Spinner />
    }

    if (isError){
        return <h1 className="bg-red-600 border border-fg-brand text-center"> {error.message}</h1>
    }

        console.log(data.data.post)

  return (

    <>

      {/* <h1>Post Details Page</h1> */}
    <div className="w-3/4 mx-auto">
    <PostCard post={data.data.post} isSinglePost={true}/>

    </div>

    </>

  )
}

