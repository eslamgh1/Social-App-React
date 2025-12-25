import axios from "axios"
import React, { useEffect, useState } from "react"
import PostCard from "../PostCard/PostCard"
import Spinner from "../Spinner/Spinner"

export default function Home() {
    const [allPosts, setAllPosts] = useState(null)


    function getAllPosts() {
        axios.get("https://linked-posts.routemisr.com/posts?limit=5", {
            headers: {
                "token": localStorage.getItem("tkn")
            }
        }).then((res) => {
            setAllPosts(res.data.posts)
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(function () {
        getAllPosts()
    }, [])


    return (
        <>
            {allPosts == null ? <Spinner/> : <div className="w-1/2 mx-auto bg-gray-400 flex flex-col gap-3">
            {allPosts.map(post =><PostCard key={post._id} post={post}/>
                        )
                    }

                </div>
            }



        </>

    )

}
