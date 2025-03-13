import React, { useState } from 'react';
import './Login.css';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik";
import { loginValidation } from '../../validations/login.validate';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { getUser, login } from '../../State/Auth/Action';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: loginValidation,
        onSubmit: async (values) => {
            const result = await dispatch(login(values));
            if (result.success) {
                toast.success("login successfully");
                dispatch(getUser());
                navigate("/ecommerce/products");
            }
        }
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='login-main-component p-3 display-grid grid-template-columns-1fr-1fr'>
                <div className='login-image-text border-radius-10'>
                    <h1 className='login-text position-absolute'>Orgainc  <br />Mind</h1>
                    <div className='d-flex justify-content-center align-item-center position-relative'>
                        <img src='homeImage.png' />
                    </div>
                </div>
                <div className='login-content-component d-flex justify-content-center align-item-center border-radius-10 b-ws'>
                    <div className='login-sub-content'>
                        <div>
                            <h1 className='black-color font-weight-6'>Sign In</h1>
                            <input
                                name="email"
                                type='text'
                                placeholder='Enter your email'
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                className='login-input mt-3 border-radius-5 p-2 b-ws'
                            />
                            {formik.touched.email && formik.errors.email && (
                                <span className='text-error'>{formik.errors.email}</span>
                            )}
                        </div>
                        <div className="position-relative">
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Enter your password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                className="login-input mt-3 border-radius-5 p-2 b-ws"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="btn-eye"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                            {formik.touched.password && formik.errors.password && (
                                <span className='text-error'>{formik.errors.password}</span>
                            )}
                        </div>
                        <button className='submit-btn width-full mt-4 border-radius-5 cursor-pointer'>
                            Sign In
                        </button>
                        <p className='mt-4 d-flex justify-content-center align-item-center font-size'>
                            Don't have an account? <a href='/signup'>&nbsp;Sign Up</a>
                        </p>
                    </div>
                </div>
            </div>
        </form >
    )
}
export default Login;