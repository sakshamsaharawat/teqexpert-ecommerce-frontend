import React, { useState } from 'react';
import { useFormik } from 'formik';
import "./AddProduct.css"
import { RootState } from '../../store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Avatar, IconButton } from '@mui/material';
import { removeKeysByValues } from '../../utils/removeEmptyKeys';
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import AddProductValidation from '../../validations/Add-task.validate';
import { createProduct } from '../../State/AddTask/Action';
import { CreateProduct } from './interface/Add-Product.interface';

const AddProduct: React.FC = () => {
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik<CreateProduct>({
        initialValues: {
            title: "",
            description: "",
            image_url: "",
            price: 0
        },
        validationSchema: AddProductValidation,
        onSubmit: async (values) => {
            const cleanData = removeKeysByValues({ ...values, image_url: profileImageUrl }, [null, "", undefined, 0]);
            const payload = await dispatch(createProduct(cleanData));
            if (payload?.success) {
                toast.success("Product created successfully.");
                navigate(-1);
            }
        }
    });

    const handleImageChange = async (event: any) => {
        const file = event?.target?.files[0];
        if (!file) return;
        const formData = new FormData()
        formData.append("file", file);
        formData.append("upload_preset", "image_preset");
        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dcmtgohkh/image/upload",
                formData
            )
            setProfileImageUrl(response.data.secure_url);

        } catch (error: any) {
            toast.error(error.message)
        }
    };

    return (
        <div>
            <div className='mt-2'>
                <h1 className='heading-color pl-2'>Add New Product</h1>
            </div>
            <div className='main-add-task p-2'>
                <form onSubmit={formik.handleSubmit} className='add-task-form p-5 b-ws border-radius-10'>
                <div className='position-relative d-flex align-item-center mt-3'>
                    <Avatar
                        alt="User Name"
                        src={profileImageUrl}
                        sx={{
                            width: 100,
                            height: 100,
                            backgroundColor: "gray",
                            fontSize: "20px",
                        }}
                    >
                    </Avatar>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                        id="upload-avatar"
                    />
                    <label htmlFor="upload-avatar">
                        <IconButton
                            sx={{
                                position: "relative",
                                bottom: -30,
                                right: 30,
                                backgroundColor: "white",
                                boxShadow: 2,
                                padding: "5px",
                                "&:hover": {
                                    backgroundColor: "#f0f0f0",
                                },
                            }}
                            component="span"
                        >
                            <AddIcon fontSize="small" />
                        </IconButton>
                    </label>
                    <p>Click to Upload profile photo</p>
                </div>
                    <div>
                        <input
                            type='text'
                            name='title'
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            placeholder='Please enter product title'
                            className='add-task-input width-full mt-2'
                        />
                        {formik.touched.title && formik.errors.title && (
                            <span className='text-error'>{formik.errors.title}</span>
                        )}
                    </div>
                    <div>
                        <textarea className="add-task-description p-1 mt-2 border-radius-5 font-size"
                            name="description"
                            placeholder='Please enter product description'
                            value={formik.values.description}
                            onChange={formik.handleChange}
                        >
                        </textarea>
                        {formik.touched.description && formik.errors.description && (
                            <span className='text-error'>{formik.errors.description}</span>
                        )}
                    </div>
                    <div>
                        <input
                            type='number'
                            name='price'
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            placeholder='Please enter product price'
                            className='add-task-input width-full mt-2'
                        />
                        {formik.touched.price && formik.errors.price && (
                            <span className='text-error'>{formik.errors.price}</span>
                        )}
                    </div>
                    <div className='d-flex justify-content-end mt-5'>
                        <button className='add-task-btn cancel-btn border-radius-5 cursor-pointer'
                            type='button'
                            onClick={() => navigate(-1)}
                        >Cancel</button>
                        <button className='add-task-btn submit-btn border-radius-5 ml-2 cursor-pointer' type="submit">Save</button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}
export default AddProduct;