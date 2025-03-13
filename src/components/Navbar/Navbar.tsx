import React from 'react';
import { AppBar, Badge, Box, IconButton, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useSelector } from 'react-redux';
import { logout } from '../../State/Auth/Action';
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SettingsIcon from "@mui/icons-material/Settings";

const Navbar: React.FC = ({ }) => {
    const { productReducer } = useSelector((store: RootState) => store);

    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await dispatch(logout())
        navigate("/login")
    }

    return (
        <AppBar position="static" color="default" elevation={1}>
            <Toolbar>
                <Typography variant="h6" sx={{ flexGrow: 1 }} onClick={() => navigate("/ecommerce/products")} className='cursor-pointer'>
                    Ecommerce
                </Typography>
                <Box>
                    <IconButton color="inherit" onClick={() => navigate("/ecommerce/setting")}>
                        <SettingsIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <Badge badgeContent={productReducer.cart.reduce((sum, item) => sum + item.quantity, 0)} color="primary"  onClick={() => navigate("/ecommerce/cart")}>
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Box>
                <div className="font-size d-flex ml-2">
                    <div className='d-flex cursor-pointer' onClick={() => handleLogout()}>
                        <div>
                            <LogoutIcon className='icon--main mr-1 cursor-pointer' />
                        </div>
                        <p className='cursor-pointer'>Sign Out</p>
                    </div>
                </div>
            </Toolbar>
        </AppBar>
    )
}
export default Navbar;