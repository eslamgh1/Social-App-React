import React from "react"

export default function PostHeader({post, user}) {

  return (
    
  <>
      <div className="post-header flex justify-between">
        <div className="left-part flex ">
          <img src={user.photo} className="w-10 h-10 rounded-full" alt={user.name} />
          <div className="info">
            <h5>{user.name}</h5>
            <p>{post.createdAt}</p>
          </div>
        </div>
        <div className="right-part bg-red-200">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>

  </>
    
  )
}

