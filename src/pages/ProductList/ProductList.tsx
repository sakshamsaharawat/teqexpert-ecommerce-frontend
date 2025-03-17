import React, { useEffect } from 'react';
import './ProductList.css';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { getCart, getProduct, updateCart } from '../../State/AddTask/Action';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { ProductItem } from '../../State/AddTask/interface/get-task.interface';

const ProductList: React.FC = () => {
  const navigate = useNavigate();
  const { productReducer, authReducer } = useSelector((store: RootState) => store);

  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCart());
  }, [dispatch])

  const handleAddTask = () => {
    navigate("/ecommerce/add-product");
  };

  const addToCart = (product: ProductItem) => {
    dispatch(updateCart(product, true, authReducer?.user?._id));
  }

  const removeToCart = (product: ProductItem) => {
    const cartProduct = productReducer.cart.find(cartItem => cartItem.product_id === product._id);
    if (cartProduct && cartProduct?.quantity > 0) {
      dispatch(updateCart(product, false, authReducer?.user?._id));
    }
  }

  return (
    <div className='p-2'>
      <div className='upcoming-main-component'>
        <div className="mt-5">
          <form>
            <div className='d-flex upcoming-btn'>
              <button className='submit-btn upcoming-input-btn border-radius-5 cursor-pointer'
                onClick={() => handleAddTask()}
                type='button'
              >
                + &nbsp; Add New Product</button>
            </div>
            <section className='today-main-section p-4 mt-2'>
              {Array.isArray(productReducer?.products) && productReducer?.products?.length > 0 ? (
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  {productReducer?.products.map((product, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Card sx={{ maxWidth: 250, boxShadow: 2, borderRadius: 2, m: 2 }}>
                        <CardMedia component="img" height="200" image={product.image_url} alt={product.title} />
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold">
                            {product.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Description: {product.description}
                          </Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                            Price: ${product.price}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                            <Button variant="contained" size="small" onClick={() => addToCart(product)}>+</Button>
                            <Typography sx={{ mx: 2 }}>{productReducer.cart.find(cartItem => cartItem.product_id === product._id)?.quantity || 0}</Typography>
                            <Button variant="contained" size="small" onClick={() => removeToCart(product)}>-</Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <div className="d-flex align-item-center justify-content-center flex-direction-column">
                  <img src="/document.png" className='no-task-image' />
                  <h4>No products found to display</h4>
                </div>
              )}
            </section>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ProductList;