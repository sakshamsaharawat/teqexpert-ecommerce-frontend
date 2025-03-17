import React, { useEffect } from 'react';
import './Cart.css';
import { getCart, updateCart } from '../../State/AddTask/Action';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Box, Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { ProductItem } from '../../State/AddTask/interface/get-task.interface';

const Cart: React.FC = () => {
  const { productReducer, authReducer } = useSelector((store: RootState) => store);
  const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch])

  const addToCart = (product: ProductItem) => {
    dispatch(updateCart(product, true, authReducer?.user?._id));
  }

  const removeToCart = (product: ProductItem) => {
    dispatch(updateCart(product, false, authReducer?.user?._id));
  }

  return (
    <div>
      <form>
        <section className='today-main-section p-4 mt-2'>
          {Array.isArray(productReducer.cart) && productReducer.cart?.length > 0 ? (
            <>
              <Grid container spacing={2} sx={{ mt: 2 }}>
                {productReducer?.cart.map((cart, index) => (
                  <>
                    {<Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                      <Card sx={{ maxWidth: 250, boxShadow: 2, borderRadius: 2, m: 2 }}>
                        <CardMedia component="img" height="200" image={cart?.product?.image_url} alt={cart?.product?.title} />
                        <CardContent>
                          <Typography variant="h6" fontWeight="bold">
                            {cart?.product?.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Description: {cart?.product?.description}
                          </Typography>
                          <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                            Price: ${cart?.product?.price}
                          </Typography>
                          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mt: 2 }}>
                            <Button variant="contained" size="small" onClick={() => addToCart(cart?.product)}>+</Button>
                            <Typography sx={{ mx: 2 }}>{productReducer.cart.find(cartItem => cartItem.product_id === cart?.product?._id)?.quantity || 0}</Typography>
                            <Button variant="contained" size="small" onClick={() => removeToCart(cart?.product)}>-</Button>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>}
                  </>
                ))}
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                Total Amount: {productReducer.cart.reduce((total, item) => {
                  return total + item.quantity * item.product?.price;
                }, 0)}
              </Grid>
            </>
          ) : (
            <div className="d-flex align-item-center justify-content-center flex-direction-column">
              <img src="/document.png" className='no-task-image' />
              <h4>No products found in cart to display</h4>
            </div>
          )}
        </section>
      </form>
    </div>
  )
}
export default Cart;