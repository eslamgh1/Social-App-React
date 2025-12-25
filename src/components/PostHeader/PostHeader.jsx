import React from "react"

export default function PostHeader({photo , name,createdAt}) {
    const STATIC_USER_IMAGE = "https://res.cloudinary.com/demo/image/upload/d_avatar.png/non_existent_user.png"


  return (
    
  <>
      <div className="post-header flex justify-between">
        <div className="left-part flex ">
          <img onError={(e) => { e.target.onerror = null; e.target.src = STATIC_USER_IMAGE }} src={photo} className="w-10 h-10 rounded-full" alt={name} />
          {/* <img src={photo} className="w-10 h-10 rounded-full" alt={name} /> */}
          <div className="info">
            <h5>{name}</h5>
            <p>{createdAt}</p>
          </div>
        </div>
        <div className="right-part bg-red-200">
          <i class="fa-solid fa-ellipsis"></i>
        </div>
      </div>

  </>
    
  )
}

