import React, { useState } from 'react'
import DataTable from 'react-data-table-component';
import Sitebar from '../sitebar/Sitebar';
import Nav from '../narbar/Nav';
import "./OrderShop.css";

const OrderShop=() =>
{
  const columns= [
    {
    name:'Product',
    selector:row => row.product,
    sortable:true
  },
  {
    name:'Date',
    selector:row => row.date,
    sortable:true
  },
  {
    name:'Customer',
    selector:row => row.customer,
    sortable:true
  },
  {
    name:'Payment', 
    selector:row => row.payment,
    sortable:true
  },
  {
    name:'Status',
    selector:row => row.status,
    sortable:true
  },
  {
    name:'Price',
    selector:row => row.price,
    sortable:true
  },
  ];
  const data = [
    {
      id:1,
      product:'vest hoddie',
      date:'6.8.2024',
      customer:'chieko chute',
      payment:'paid',
      status:'unfullfilled',
      price:'$34',
    },
    {
      id:2,
      product:'vest hoddie',
      date:'6.8.2024',
      customer:'chieko chute',
      payment:'paid',
      status:'unfullfilled',
      price:'$34',
    },
    {
      id:3,
      product:'vest hoddie',
      date:'6.8.2024',
      customer:'chieko chute',
      payment:'paid',
      status:'unfullfilled',
      price:'$34',
    },
    {
      id:4,
      product:'vest hoddie',
      date:'6.8.2024',
      customer:'chieko chute',
      payment:'paid',
      status:'unfullfilled',
      price:'$34',
    },
    {
      id:5,
      product:'vest hoddie',
      date:'6.8.2024',
      customer:'chieko chute',
      payment:'paid',
      status:'unfullfilled',
      price:'$34',
    },
    {
      id:6,
      product:'vest hoddie',
      date:'6.8.2024',
      customer:'chieko chute',
      payment:'paid',
      status:'unfullfilled',
      price:'$34',
    },
  ]
  const[records,setRecords] = useState(data);
  function handleFilter(event){
    const newData = records.filter(row =>{
      row.product.tolowerCase().includes(event.target.value.tolowerCase())
    })
    // setRecords(newDta);
  }
  return (
    <>
    <div className="ordershop-container">
    <div className="ordershop-inner-container">
  <DataTable
      columns={columns}
      data={records}
  
      fixedHeader
      pagination
      >

    </DataTable>
  </div>
  </div>

  </>
//    <div className="container mt-5">
//     <div className='text-end'> <input type = "text"></input></div>
//     <DataTable
//       columns={columns}
//       data={records}
//       selectableRows
//       fixedHeader
//       pagination
//       >

//     </DataTable>
    
//    </div>
  )
}

export default OrderShop
