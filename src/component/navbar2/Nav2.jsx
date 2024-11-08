import React, { useEffect, useState } from 'react'
import "../narbar/Nav.css";
import {NavLink}from 'react-router-dom'
import { api } from '../Core';

function Nav2() {

  const [profileimage,setProfileImage]=useState("");

  const fetchUser = async () => {
    const jwt = localStorage.getItem("token");
    const res = await fetch(`${api}/v1/api/user/info`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    const data = await res.json();
    if (res.status == 200) {
        const base64Image = data.profileimage;
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        setProfileImage(imageUrl);
    }
}
  useEffect(()=>{
    fetchUser();
  },[]);
  return (
    <>
       <nav className="navbar">
            <div className="logo">
                <NavLink to="/shop/dashboard" style={{textDecoration:"none"}}>
                    <img className="logo" src={profileimage} alt="" />
                </NavLink>
            </div>
            <ul className="nav-links">
               
            </ul>
        </nav>
    </>
  )
}

export default Nav2
