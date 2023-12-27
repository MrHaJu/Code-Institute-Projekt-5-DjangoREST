import React from "react";


const Avatar = ({ src, height = 45, text }) => {
  return (
    <span>
      <img
        className="Avatar"
        src={src}
        height={height}
        width={height}
        alt="avatar"
      />
      {text}
    </span>
  );
};

export default Avatar;