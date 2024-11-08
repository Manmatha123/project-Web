import React from 'react'
import Nav from '../narbar/Nav'
import Sitebar from '../sitebar/Sitebar'

function Test() {
  return (
    <>
      <div className="container">
        <div className="top-body">
        <Nav/>
        </div>
        
<div className="bottom-body">
    <div className="left-body">
        <Sitebar/>
    </div>
    <div className="right-body">

    </div>
</div>
      </div>
    </>
  )
}

export default Test
