import axios from "axios"
import  {  useState } from "react"
import PostCard from "../PostCard/PostCard"
import Spinner from "../Spinner/Spinner"
import { useQuery } from "@tanstack/react-query"



export default function Home() {
    const [allPosts, setAllPosts] = useState(null)

    // function getAllPosts() {
    //     axios.get("https://linked-posts.routemisr.com/posts?limit=5", {
    //         headers: {
    //             "token": localStorage.getItem("tkn")
    //         }
    //     }).then((res) => {
    //         setAllPosts(res.data.posts)
    //     }).catch((err) => {
    //         console.log(err)
    //     })
    // }

    // useEffect(function () {
    //     getAllPosts()
    // }, [])


    // 1. This function just returns the Promise (the "logic")
    
    function getAllPosts() {
        return axios.get("https://linked-posts.routemisr.com/posts?limit=5", {
            headers: {
                token: localStorage.getItem("tkn"),
            },
        });
    }

    const { data, isLoading, isError, error} = useQuery({
        queryKey: ['getPosts'], // Initial data fetch for posts from API
        queryFn: getAllPosts, // fn must return promise like axios
        refetchInterval: 1000 * 60 * 60 * 24 // input by millisecond to day
    });
    
    // const allPosts = data?.data.posts

    console.log({data})

    // It is nesseccary to aavoid: Cannot read properties of undefined (reading 'data')
    if (isLoading){
        return <Spinner />
    }

    if (isError){
        return <h1 className="bg-red-600 border border-fg-brand text-center"> {error.message}</h1>
    }

    return (
        <>

            <div className="w-1/2 mx-auto bg-gray-400 flex flex-col gap-3">
                {data.data.posts.map(post => <PostCard key={post._id} post={post} isSinglePost={false}/>
                )
                }

            </div>

            {/* {allPosts == null ? <Spinner /> : <div className="w-1/2 mx-auto bg-gray-400 flex flex-col gap-3">
                    {allPosts.map(post => <PostCard key={post._id} post={post} />
                    )
                    }

                </div>
                }

 */}

        </>

    )

}
