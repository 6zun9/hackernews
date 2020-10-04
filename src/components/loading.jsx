import React from 'react'

import ClipLoader from "react-spinners/ClipLoader";


export const Loading = () => {
  return (
  <div className="container d-flex justify-content-center align-items-center flex-column">
    <ClipLoader
    size={60}
    color={"#ff6d00"}
    />
  </div>
  )
}

