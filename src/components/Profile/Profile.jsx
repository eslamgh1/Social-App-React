import React from "react"
import { useContext } from "react"
import { authContext } from "../../context/authContext"
import axios from "axios"
import Spinner from "../Spinner/Spinner"
import { useQuery } from "@tanstack/react-query"
import PostCard from "../PostCard/PostCard"



export default function Profile() {

    const {userId} = useContext(authContext)

    function getUserPosts(){
        return axios.get(`https://linked-posts.routemisr.com/users/${userId}/posts?limit=20`, {
            headers: {
                token: localStorage.getItem("tkn"),
            },
        })
    }

    const { isLoading , isError , data , error } = useQuery({
        queryKey: ["getUserPosts" , userId],
        queryFn: function(){
            return getUserPosts(userId)
        }
    })

    if(isLoading){
        return <div><Spinner/></div>
    }

    if(isError){
    return <h1 className="bg-red-600 border border-fg-brand text-center"> {error.message}</h1>
    }

    console.log({data})
    console.log(data.data.posts)


    return (

        <>


           <div className="w-1/2 mx-auto">
            {data.data.posts.map(post => <PostCard key={post.id} post={post} isSinglePost={false}/>)}
           </div>

        </>

    )
}

