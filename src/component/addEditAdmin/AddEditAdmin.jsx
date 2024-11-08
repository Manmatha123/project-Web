import React, { useEffect, useRef, useState } from 'react'
import "./AddEditAdmin.css";
import Nav from "../narbar/Nav";
import Sitebar from "../sitebar/Sitebar";
import { toast } from 'react-toastify';
import { api } from '../Core';
import Nav2 from '../navbar2/Nav2';


function AddEditAdmin() {

    const [img, setImg] = useState();
    const [profileimage, setProfileImage] = useState();
    const myImgRef = useRef();
    const [user, setUser] = useState({ id: "", name: "", profileimage: "", phone: "", address: "", password: "" });
    const [store, setStore] = useState({ id:"", name: "", description: "", place: "", district: "", pin: "", category: "", delivory: false, delivirycharge: "", opentime: "", closetime: "" })


//get store info
const storeInformation=async()=>{
    const jwt = localStorage.getItem("token");
    const res = await fetch(`${api}/v1/api/store/info`, {
        method: "GET",
        headers: {
            Authorization: `Bearer ${jwt}`
        }
    });
    if (res.status == 200) {
        const data = await res.json();
        setStore(data);
    }
}
const deliveryChange=(val)=>{
    setStore({...store,delivory:val==="true"?true:false});
}
//store input handler
    const storeInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setStore({ ...store, [name]: value });
    }

    //set input value
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({ ...user, [name]: value });
    }


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
            setUser(data);
            const base64Image = data.profileimage;
            const imageUrl = `data:image/jpeg;base64,${base64Image}`;
            setProfileImage(imageUrl);
        
        }
    }

    //api to update profile image
    const updateProfileImage = async () => {
        try {

            if (img.size > 1000000) {
                toast.error("File size must be less then 1MB");
                return;
            }

            const jwt = localStorage.getItem("token");
            const data = new FormData();
            data.append("file", img);

            let res = await fetch(`${api}/v1/api/user/profile`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                body: data
            });
            const result = await res.json();
            if (!result.status) {
                fetchUser();
                toast.error("fail to update");
                return;
            }
            toast.success("successfuly update profile");
            window.location.reload()
            fetchUser();
        }
        catch (e) {
            toast.error("Something went wrong");
        }

    }
    //update user information  "/v1/api/user/update"
    const updateUserInformation = async () => {
        try {
            const { id, name, phone, password, address } = user;

            if (name === "" || name === null) {
                toast.error("Name can't be empty");
                return;
            }
            if (phone === "" || phone.length > 10 || password === "") {
                toast.error("Invalid phone number");
                return;
            }


            const jwt = localStorage.getItem("token");
            const data = await fetch(`${api}/v1/api/user/update`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    id, name, phone, password, address
                })
            });
            const res = await data.json();

            if (!res.status) {
                toast.error(res.message);
                return;
            }
            toast.success("successfuly update");
            localStorage.setItem("token", res.message);;
            fetchUser();
        }
        catch (e) {
            toast.error("Something went wrong");
        }
    }
    //store update
    const updateStore = async (e) => {
        e.preventDefault();
        try {
                
            const {id,name,description,place,district,pin,category,delivory,delivirycharge,opentime,closetime}=store;

            if (name===""|| description===""|| place===""|| district===""|| pin===""|| category===""|| delivirycharge===""|| opentime===""|| closetime=="") {
            toast.error("Fill all the details");
            return;
            }

            const jwt = localStorage.getItem("token");
            const data = await fetch(`${api}/v1/api/store/saveorupdate`, {
                method: "POST",
                headers: {
                    'Content-Type': "application/json",
                    Authorization: `Bearer ${jwt}`
                },
                body: JSON.stringify({
                    id,name,description,place,district,pin,category,delivory,delivirycharge,opentime,closetime,
                    "user":user
                })
            });

            const res = await data.json();
            if (!res.status) {
                toast.error(res.message);
                return;
            }
            toast.success(res.message);
            storeInformation();
           
        } catch (error) {
            toast.error("Something went wrong");
        }
    }

    useEffect(() => {
        fetchUser();
        storeInformation();
    }, []);

    return (
        <>
            <div className="container-addedit">
                <div className="top-container">
                    <Nav2/>
                </div>
                <div className="body-container">

                    <div className="left-body">
                        <Sitebar />
                    </div>


                    <div className="right-body">
                        <div className="user-add-edit">
                            <div className="user-profle" >
                                <input id='fileimg' type="file" onChange={(e) => setImg(e.target.files[0])} ref={myImgRef} />
                                {
                                    img ? <img src={URL.createObjectURL(img)} alt="" onClick={() => myImgRef.current.click()} /> :
                                        <img src={profileimage} alt="" onClick={() => myImgRef.current.click()} />
                                }
                                {
                                 profileimage?"":   img ? "" : <i className="fa-solid fa-cloud-arrow-up" onClick={() => myImgRef.current.click()}></i>
                                }

                            </div>
                            <button id='imgupload-btn' onClick={updateProfileImage}>Upload</button>

                            <div className="user-inputfield">

                                <div className="input-div">
                                    <label htmlFor="uname">Name</label>
                                    <input type="text" value={user.name} name='name' onChange={(e) => inputHandler(e)} id='uname' placeholder='Name' />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="uphone">Phone</label>
                                    <input type="text" value={user.phone} name='phone' onChange={(e) => inputHandler(e)} id='uphone' placeholder='Phone' />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="uaddress">Address</label>
                                    <textarea type="text" value={user.address} name='address' onChange={(e) => inputHandler(e)} id='uaddress' placeholder='address' />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="password">Password</label>
                                    <input type="text" password={user.password} name='password' onChange={(e) => inputHandler(e)} id='password' placeholder='Password' />
                                </div>
                                <button onClick={updateUserInformation}>Update</button>
                            </div>
                        </div>

                        <div className="store-add-edit">
                            <h3>Edit Store</h3>

                            <form className="store-inputfield" onSubmit={updateStore}>

                                <div className="input-div-store">
                                    <div className="input-left">
                                        <label htmlFor="sname">Name</label>
                                        <input type="text" required id='sname' onChange={(e) => storeInputChange(e)} name='name'  value={store.name} placeholder='Name' />
                                    </div>

                                    <div className="input-left">
                                        <label>Deliviry Charges</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='delivirycharge'  value={store.delivirycharge} placeholder='Deliviry Charges' />
                                    </div>
                                </div>

                                <div className="input-div-store">
                                    <div className="input-left">
                                        <label>Place</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='place'  value={store.place} placeholder='place' />
                                    </div>

                                    <div className="input-right">
                                        <label >District</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='district'  value={store.district} placeholder='District' />
                                    </div>
                                </div>

                                <div className="input-div-store">
                                    <div className="input-left">
                                        <label>Pin</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='pin' value={store.pin} placeholder='Pin code' />
                                    </div>

                                    <div className="input-right">
                                        <label >Category</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='category' value={store.category} placeholder='Category' />
                                    </div>
                                </div>

                                <div className="input-div-store">
                                    <div className="input-right">
                                        <label >Opening Time</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='opentime' value={store.opentime} placeholder='Opening Time' />
                                    </div>

                                    <div className="input-right">
                                        <label >Closeing Time</label>
                                        <input type="text" required onChange={(e) => storeInputChange(e)} name='closetime'  value={store.closetime} placeholder='Closeing Time' />
                                    </div>
                                </div>

                                <div className="textarea-div-store">
                                    <label >Description</label>
                                    <textarea type="text" required onChange={(e) => storeInputChange(e)} placeholder='Description' value={store.description} name='description' />
                                </div>
                                <div className="gender-selection">
                                    <label>
                                        <input type="radio" checked={store.delivory===true}  onClick={() => deliveryChange("true")} name="delivory" value="true" />
                                        <span className="custom-radio"></span>
                                        Availabe deliver
                                    </label>
                                    <label>
                                        <input type="radio" checked={store.delivory===false} onClick={() => deliveryChange("false")} name="delivory" value="false" />
                                        <span className="custom-radio"></span>
                                        No deviver available
                                    </label>
                                </div>
                                <button className='submitStore' type='submit'>Update</button>
                            </form>


                        </div>

                    </div>


                </div>
            </div>

        </>
    )
}

export default AddEditAdmin



// private Long id;
// private String name;##
// private String description;
// private String place;####
// private String district;##
// private String pin;###
// private String category;###
// private boolean delivory;
// private String delivirycharge;##
// private String opentime;#####
// private String closetime;######