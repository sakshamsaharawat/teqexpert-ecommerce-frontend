import React from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
    const navigate = useNavigate()
    return (
        <div className='home-main-component p-3 display-grid grid-template-columns-1fr-1fr'>
            <div className='home-image-text d-flex justify-content-center border-radius-10'>
                <h1 className='home-text position-absolute'>Orgainc  <br />Mind</h1>
                <div className='image d-flex justify-content-center align-item-center'>
                    <img src='homeImage.png' />
                </div>
            </div>
            <div className='home-get-start d-flex justify-content-center align-item-center border-radius-10 b-ws'>
                <div>
                    <h1 className='black-color font-weight-6 text-center'>Ecommerce</h1>
                    <p className='font-size mt-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <p className='font-size mt-2 text-center'>Lorem ipsum dolor sit amet </p>
                    <button className='submit-btn width-full mt-4 border-radius-5 cursor-pointer' onClick={() => navigate("/signup")}>
                        Get Started
                    </button>
                    <p className='mt-4 d-flex justify-content-center align-item-center font-size'>
                        Already have an account ? <a href='/login'>Sign In</a>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default Home;