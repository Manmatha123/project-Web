import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import "./SearchBar.css";
import Sitebar from "../sitebar/Sitebar";
import Nav2 from "../navbar2/Nav2";
import { api } from "../Core";
import { toast } from "react-toastify";
import generateBill from "./generateBill";

const BillingPage = () => {
  const [input, setInput] = useState("");
  const [quantity, setQuantity] = useState("");
  const [results, setResults] = useState([]);
  const [selecteditem, setSelecteditem] = useState({ id: "", price: "", discount: "", category: "", descripton: "", brand: "", available: false, name: "", quantity: "", image: "", sellunit: "" });
  const [purchaseitemList, setPurchaseItemList] = useState([]);
  const [store, setStore] = useState({});


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

  const fetchData = async (name) => {
    if (name == "" || name == null || !name) {
      setResults([]);
      return;
    }
    const jwt = localStorage.getItem("token");
    const res = await fetch(`${api}/v1/api/product/list/name/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`
      }
    });
    const data = await res.json();
    if (res.status === 200) {
      setResults(data);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  const addSelectedItem = () => {
    if (selecteditem.id == "") {
      toast.error("Please select an item");
      return;
    }
    if (quantity < 0 || quantity == 0 || quantity === "") {
      toast.error("Invalid quantity");
      return;
    }
    if (selecteditem.quantity < quantity) {
      toast.error("In sufficient quantity");
      return;
    }
    let qty = Number(quantity);
    const { id, price, discount, category, sellunit, descripton, brand, available, name, image } = selecteditem;

    const item = {
      id: id, price: price, discount: discount, sellunit, category: category, descripton: descripton, brand: brand, available: available, name: name, quantity: qty, image: image
    }
    let counter = 0;
    if (purchaseitemList.length > 0) {
      purchaseitemList.map(data => {
        if (item.id === data.id) {
          counter++;
        }
      })
    } else {
      setPurchaseItemList([...purchaseitemList, item]);
      setInput("");
      setQuantity("");
    }
    if (counter === 0) {
      setPurchaseItemList([...purchaseitemList, item]);
      setInput("");
      setQuantity("");
    }

  }
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: '#f0f0f0',
      },
    },
  };

  const selectGetItem = (data) => {
    if (purchaseitemList.length > 0) {
      purchaseitemList.map(item => {
        if (item.id !== data.id) {
          setSelecteditem(data);
          setInput(data.name);
        }
      })
    } else {
      setInput(data.name);
      setSelecteditem(data);
    }

  }


  const printBill = async () => {
    try {
      const jwt = localStorage.getItem("token");
      const data = await fetch(`${api}/v1/api/product/bill`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`
        },
        body: JSON.stringify(purchaseitemList)
      });

      const res = await data.json();
      console.log(res)
      if (res.status) {
       await generateBill(purchaseitemList,store);
        toast.success(res.message);
        setPurchaseItemList([]);
      } else {
        toast.error(res.message);
      }
    } catch (e) {
      toast.error("Something  went wrong");
    }
  }

  const removeSelected = (id) => {
    const itemlist = purchaseitemList.filter((item) => item.id != id);
    setPurchaseItemList(itemlist);
  }

  // ,"/v1/api/product/bill"



  const columns = [
    {
      name: 'ID',
      selector: (row, index) => index + 1,
      sortable: true
    },
    {
      name: 'Image',
      selector: row => <img src={`data:image/jpeg;base64,${row.image}`} id='productImage' />
    },
    {
      name: 'Name',
      selector: row => row.name,
      sortable: true
    },
    {
      name: 'Mrp.',
      selector: row => row.price,
      sortable: true
    },
    {
      name: 'Quantity',
      selector: row => row.quantity + " " + row.sellunit,
      sortable: true
    },
    {
      name: 'Discount',
      selector: row => row.discount + "%",
      sortable: true
    },
    {
      name: 'Price',
      selector: row => (row.price*row.quantity) -(((row.price*row.quantity)/100)*row.discount),
      sortable: true
    },
    {
      name: 'Action',
      selector: (row) => (

        <>
          <i className="fa-solid fa-trash" id='deleteProduct' onClick={() => removeSelected(row.id)}></i>
        </>
      )
    },
  ];

const getGrandTotal=()=>{
  let total=0;
  purchaseitemList.map(item=>{
    total=total+((item.price*item.quantity) -(((item.price*item.quantity)/100)*item.discount))
  })
  return total.toFixed(2);
}

useEffect(()=>{
  storeInformation();
},[]);


  return (

    <>

      <div className="container-addedit">
        <div className="top-container">
          <Nav2 />
        </div>
        <div className="body-container">
          <div className="left-body"> <Sitebar /> </div>
          <div className="right-body" style={{ display: "flex", flexDirection: "column" }}>
<img id="billingBgImage" src="https://cdn.pixabay.com/photo/2017/12/26/09/15/woman-3040029_1280.jpg" alt="" />
            <div className="billingpage">



        <div className="search-container">
      <input 
        type="text" 
        className="search-input" 
        placeholder="Search by name..." 
        value={input} name="name"
        onChange={(e) => handleChange(e.target.value)}
      />
      <input 
        type="number" 
        className="quantity-input" 
        placeholder="Quantity" 
         name="quantity"  value={quantity} onChange={(e) => setQuantity(e.target.value)}
      />
      <button onClick={addSelectedItem} className="add-button">Add</button>
    </div>


              {
                input && results.length > 0 ?
                  <div className="result-table">
                    <table border="0" cellPadding="10px" cellSpacing="0">
                      <thead>
                        <tr>
                          <th scope="col">Image</th>
                          <th scope="col">Name</th>
                          <th scope="col">Qty</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result, id) => (
                          <tr key={result.id} className="search-result" onClick={() => selectGetItem(result)}>
                            <td><img src={`data:image/jpeg;base64,${result.image}`} alt="" /></td>
                            <td>{result.name}</td>
                            <td>{result.quantity} {result.sellunit}</td>
                          </tr>
                        ))}


                      </tbody>
                    </table>
                  </div> : ""
              }

              <div className="SelectedItemTable">
                {
                  purchaseitemList.length > 0 ?<> <DataTable
                    title="Shoping Products"
                    columns={columns}
                    data={purchaseitemList}
                    highlightOnHover
                    actions={

                      <div className='action-button'>
                        <i className="fa-solid fa-print" id='pdfproducticon' onClick={printBill}></i>
                      </div>

                    }
                    fixedHeader
                    fixedHeaderScrollHeight='420px'
                    customStyles={customStyles} >
                  </DataTable> 
                  <footer className="tableFooter"><p>Grand Total : </p>
                  {getGrandTotal()}
                  </footer>

                  </>
                  : ""
                }


                {/* <button className="submitPrint" onClick={printBill}>Print</button> */}
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default BillingPage
