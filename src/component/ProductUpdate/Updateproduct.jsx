import React, { useEffect, useRef, useState } from "react";
import "./productUpdate.css";
import Nav from "../narbar/Nav";
import Sitebar from "../sitebar/Sitebar";
import { toast } from "react-toastify";
import { api } from "../Core";
import Nav2 from "../navbar2/Nav2";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

const Updateproduct = () => {
  const location = useLocation();
  const receivedData = location.state;
const navigate=useNavigate();
  const useImg = useRef();
  const [imageFile,setImageFile]=useState();
  const [productInfo, setProductInfo] = useState({id:"", price: "", discount: "", category: "", descripton: "", brand: "", available: false, name: "", quantity: "", image: "",sellunit:"" });
  const imgref = useRef();
  let [imageInput, setImageInput] = useState("");
  const [apiImage, setApiImage] = useState(null);
  const handelImagechange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageInput(imageUrl)
    }
  }

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setProductInfo({...productInfo,  [name]: value });
  }





  const createProduct = async (e) => {
    e.preventDefault();
    try {


      if (imageFile && (imageFile.size / (1024 * 1024)>1)) {
        toast.error("Image size should less then 1mb");
        return;
      }
      const {id, price, discount, category, descripton, brand, available, name, quantity, image,sellunit } = productInfo;
      const productdata = {
        "id":id,
        "descripton": descripton,
        "category": category,
        "brand": brand,
        "discount": discount,
        "price": price,
        "available": quantity > 0 ? true : false,
        "name": name,
        "image": "",
        "quantity": quantity,
        "sellunit": sellunit
      }

      const jwt = localStorage.getItem("token");
      const data = new FormData();
      data.append("file", imageFile);
      data.append("product",
        new Blob([JSON.stringify(productdata)], {
          type: 'application/json'
        }));

      let res = await fetch(`${api}/v1/api/product/saveorupdate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`
        },
        body: data
      });
      const result = await res.json();

      if (res.status == 200) {
        toast.success(result.message);
        if(receivedData){
          navigate("/shop/products");
        }
        setProductInfo({ price: "",sellunit:"", discount: "", category: "", descripton: "", brand: "", available: true, name: "", quantity: "", image: "" });
        setImageFile("");
        setImageInput("");
        return;
      } else {
        toast.error(result.message);
      }
    }
    catch (e) {
      toast.error("Something went wrong");
    }
  }
const isEditRequest=async()=>{
  if(receivedData){
    const jwt = localStorage.getItem("token");
    let res = await fetch(`${api}/v1/api/product/id/${receivedData}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`
      }
    });
    const result = await res.json();
    if (res.status == 200) {
      setProductInfo(result);
      setApiImage(result.image);
    }
  }
}

  useEffect(()=>{
isEditRequest();
  },[]);

  return (
    <div>
      <Nav2 />
      <form className="mainpu"  onSubmit={createProduct}>
        <div className="left-sidebar">
          <Sitebar />
        </div>

        <div className="fm">
          <div className="ucontent1  brw">
            <h3>General information</h3>
            <div>
              <h5>Product Name</h5>
              <input
                type="text" onChange={(e) => handleInput(e)}
                name="name" value={productInfo.name} required
                placeholder="Enter Inforformation ...."
              />
            </div>
            <div>
              <h5>Description</h5>
              <textarea name="descripton" required onChange={(e) => handleInput(e)} value={productInfo.descripton} id="large"></textarea>
            </div>
          </div>
          <div className="ucontent2 brw">
            <h3>Prices & About</h3>
            <div>
              <div className="twop">
                <div>
                  <h5>Base Price</h5>
                  <input type="text" required onChange={(e) => handleInput(e)} value={productInfo.price} name="price" placeholder="Price...." />
                </div>
                <div>
                  <h5>Brand</h5>
                  <input type="text" required onChange={(e) => handleInput(e)} name="brand" value={productInfo.brand} placeholder="Brand...." />
                </div>
              </div>
            </div>
            <div>
              <div className="twop">
                <div>
                  <h5>Discount Percentage (%)</h5>
                  <input type="text" required onChange={(e) => handleInput(e)} name="discount" value={productInfo.discount} placeholder="percentage...." />
                </div>
                <div>
                  <h5>Quantity</h5>
                  <input type="text" required onChange={(e) => handleInput(e)} name="quantity" value={productInfo.quantity} placeholder="Quantity...." />
                </div>
              </div>
            </div>
          </div>

        </div>
        <div className="sl">
          <div className="slcontainer brw">
            <h3>Product media</h3>
            <div>
              <h5>Photo product</h5>
              <div className="img">
                <input type="file" name="" id="inputimg" onChange={handelImagechange} ref={useImg} />
                {
                  apiImage?<img src={`data:image/jpeg;base64,${apiImage}`} id="realimg1" alt="" onClick={() => useImg.current.click()} />:
                  imageInput ? <img src={imageInput} id="realimg1" onClick={() => useImg.current.click()} />
                    : <img src='' alt="" onClick={() => useImg.current.click()} />
                }

                {
                apiImage?"":imageInput ? "" : <i className="fa-solid fa-arrow-up-from-bracket" onClick={() => useImg.current.click()} id="realimg2"></i>
                }





              </div>
              <div></div>
            </div>
          </div>
          <div className="slcontainer brw">
            <h3>Category</h3>
            <div>
              <h5>Chose Category</h5>

              <input
                type="text"
                name="category" required value={productInfo.category} onChange={(e) => handleInput(e)}
                placeholder="Enter Category ...."
              />

            </div>
            <div>
              <h5>Selling Unit</h5>
              <input
                type="text"
                name="sellunit" required value={productInfo.sellunit} onChange={(e) => handleInput(e)}
                placeholder="Enter Selling Unit ...."
              />

            </div>
          </div>
              {/* <button type="submit" id="productSubmitButton"  >submit</button> */}
              {/* <button class="button-92" type="submit">submit</button> */}
              <button class="button-48" type="submit"><span class="text">submit</span></button>
        </div>
      </form>
    </div>
  );
};

export default Updateproduct;
