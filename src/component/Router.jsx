import React from 'react'
import Home1 from './home1/Home1'
import {Route,Routes}from 'react-router-dom';
import Login from './login/Login';
import Redg from './register/Redg';
import Test from './Test.jsx/Test';
import AvailableProduct from './AvailableProduct/AvailableProduct';
import AddEditAdmin from './addEditAdmin/AddEditAdmin';
import DashboardAdmin from './adminpage/DashboardAdmin';
import UpdateProduct from "./ProductUpdate/Updateproduct"
import BillingPage from './billingpage/BillingPage';
import Logout from './Logout';
import E404Error from './E404Error';
const Router=()=> {


  return (
    <>
    <Routes>
        <Route path='/' element={<Home1/>}/>
        <Route path='/shoping/signin' element={<Login/>}/>
        <Route path='/shoping/signup' element={<Redg/>}/>
        <Route path='/shop/products' element={<AvailableProduct/>}/>
        <Route path='/shop/products/add-edit' element={<UpdateProduct />}/>
        <Route path='/shop/edit' element={<AddEditAdmin/>}/>
        <Route path='/shop/dashboard' element={<DashboardAdmin/>}/>
        <Route path='/shop/sales' element={<BillingPage/>}/>
        <Route path='/shop/logout' element={<Logout/>}/>
        <Route path='*' element={<E404Error/>}/>
    </Routes>
{/* <Test/> */}
    
      
    </>
  )
}

export default Router
