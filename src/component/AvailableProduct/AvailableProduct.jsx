import React, { useEffect, useState } from 'react'
import Sitebar from '../sitebar/Sitebar'
import Nav from '../narbar/Nav'
import "./AvailableProduct.css";
import DataTable from 'react-data-table-component';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { api } from '../Core';
import generatePdf from './generatePdf';
import Nav2 from '../navbar2/Nav2';
function AvailableProduct() {
    const navigation = useNavigate();

    const [search, setSearch] = useState("");
    const [productList, setProductList] = useState([]);
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
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#f0f0f0',
            },
        },
    };    

    const editProduct=(id)=>{
        navigation("/shop/products/add-edit",{state:id})
    }
   
    const fetchAllProduct = async () => {
        try {
            const jwt = localStorage.getItem("token");
            const res = await fetch(`${api}/v1/api/product/list`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            const data = await res.json();
            if (res.status === 200) {
                setProductList(data);
                setFilterRecord(data);
            }
        } catch (e) {
            toast.error("something went wrong");
        }
    }
    const columns = [
        {
            name: 'ID',
            selector: (row,index) => index + 1,
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
            name: 'Brand',
            selector: row => row.brand,
            sortable: true
        },
        {
            name: 'Category',
            selector: row => row.category,
            sortable: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true
        },
        {
            name: 'Quantity',
            selector: row => row.quantity +" "+ row.sellunit,
            sortable: true
        },
        {
            name: 'Action',
            selector: (row) => (

                <>
                    <i className="fa-regular fa-pen-to-square" id='editProduct'  onClick={() => editProduct(row.id)}></i>

                    <i className="fa-solid fa-trash" id='deleteProduct'   onClick={() => deleteOrder(row.id)}></i>
                </>
            )
        },
    ];
    const [filterRecord, setFilterRecord] = useState(productList);
    const [column, setColumns] = useState(columns);

    const inputchange = () => {
        const filterRecords = productList.filter(data =>
            data.name.toLowerCase().match(search.toLowerCase())
        );
        setFilterRecord(filterRecords);
    }


    const printPdf = () => {
        generatePdf(productList,store);
    }
    const deleteOrder = async (id) => {
        try {
            const jwt = localStorage.getItem("token");
            const res = await fetch(`${api}/v1/api/product/delete/id/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            });
            const result = await res.json();
            if (result.status) {
                toast.success("Delete successful");
                fetchAllProduct();
                return;
            }
            toast.error("Fail to delete");
        } catch (error) {
            toast.error("Something went wrong");
        }
    }



    useEffect(() => {
        inputchange();
    }, [search]);

    useEffect(() => {
        fetchAllProduct();
        storeInformation();
    }, []);


    return (
        <>
            <div className="container-addedit">
                <div className="top-container">
                    <Nav2 />
                </div>
                <div className="body-container">

                    <div className="left-body">
                        <Sitebar />
                    </div>


                    <div className="right-body-product">
                        <div className='tableDivproduct'>

                            <DataTable
                                title="Product List"
                                columns={column}
                                data={filterRecord}
                                // selectableRows
                                //selectableRowsHighlight
                                highlightOnHover
                                actions={

                                    <div className='action-button'>
                                        <i className="fa-solid fa-print" id='pdfproducticon' onClick={() => printPdf()}></i>
                                        <i className="fa-solid fa-plus" id='addproduct' onClick={() => navigation("/shop/products/add-edit")}></i>

                                    </div>

                                }

                                subHeader
                                subHeaderComponent={
                                    <div className='inputProductSearch'>
                                        <input type='text' placeholder='Search here' value={search} onChange={(e) => setSearch(e.target.value)} ></input>
                                        {
                                            search !== "" ? <i className="fa-solid fa-xmark" onClick={() => setSearch("")} ></i> : ""
                                        }
                                    </div>
                                }
                                subHeaderAlign="left"


                                fixedHeader
                                fixedHeaderScrollHeight='420px'
                                pagination
                                customStyles={customStyles}
                            >

                            </DataTable>


                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AvailableProduct
