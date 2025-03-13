import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Cart, ProductList } from '../pages';
import Navbar from '../components/Navbar/Navbar';
import Setting from '../pages/Setting/Setting';
import AddProduct from '../pages/AddProduct/AddProduct';

const MainRoutes: React.FC = () => {
  return (
    <>
      <div >
        <Navbar />
        <Routes>
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </div>
    </>
  )
}
export default MainRoutes;