import React from "react";
import './newsitem.css'

export default function Newsitem(props) {


    const {title,description,imageurl,newsurl,author,publishedAt,source,badgecolor}= props
    // console.log(badgecolor)

 

    const time = publishedAt.split("T")[1].split('Z')[0];
  
const date = publishedAt.split('T')[0]

// console.log("news rendered")

    return (
      <div>
        <div className="card mx-3 my-2 position-relative" >
        <span className={`position-absolute top-0 start-100 badge rounded-pill bg-${badgecolor} translatealittleleft`}>
   {source}
    <span className="visually-hidden">unread messages</span></span>

          <img src={imageurl} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="card-title">{title.length>50?title.slice(0,50)+"...":title}</h5>
            <p className="card-text">
              {description.length>70?description.slice(0,70)+"...":description}
            </p>
            <p className="card-text"><small className="text-body-secondary">By-{author} on {date} at {time}</small></p>
            <a href={newsurl} className="btn btn-sm btn-primary">
              Read More
            </a>
          </div>
        </div>
      </div>
    );
  }
