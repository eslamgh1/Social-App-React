import React from "react"

export default function PostHeader() {

  return (
    
  <>
       <div className="post-header flex justify-between">
          <div className="left-part flex gap-2">
            <img src={post.user.photo} className="w-20 h-20 rounded-full" alt={post.user.name} />
            <div className="info">
              <h5>{user.name}</h5>
              <p>{post.createdAt}</p>
            </div>
          </div>

          <div className="right-part">
            <p><i class="fa-solid fa-ellipsis"></i></p>
          </div>

        </div>

  </>
    
  )
}

