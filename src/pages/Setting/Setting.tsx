import React, { useEffect, useState } from 'react';
import "./setting.css";
import { countries } from './Data/Country.list';
import { countryPhoneCodes } from './Data/Country.code';
import { Avatar, IconButton, InputAdornment, Modal, TextField } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import EmailIcon from '@mui/icons-material/Email';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-toastify';
import { updateUserValidation } from '../../validations/update-user.validate';
import { ThunkDispatch } from 'redux-thunk';
import { RootState } from '../../store';
import { AnyAction } from 'redux';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { deleteUser, getUser, updateUser } from '../../State/Auth/Action';
import { removeKeysByValues } from '../../utils/removeEmptyKeys';
import { useNavigate } from 'react-router-dom';
import { ConfirmDeleteModal } from '../../components/common/ConfrimDeleteModal';
import Loader from '../../components/loader/loader';

const Setting: React.FC = () => {
    const dispatch: ThunkDispatch<RootState, undefined, AnyAction> = useDispatch();
    const authReducer = useSelector((state: RootState) => state.authReducer);
    const [profileImageUrl, setProfileImageUrl] = useState("");
    const navigate = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        dispatch(getUser());
    }, [dispatch]);

    const handleImageChange = async (event: any) => {
        const file = event?.target?.files[0];
        if (!file) return;
        setLoading(true)
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
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        if (authReducer) {
            setProfileImageUrl(authReducer.user?.image_url || "");
            formik.setValues({
                first_name: authReducer.user?.first_name || "",
                last_name: authReducer.user?.last_name || "",
                email: authReducer.user?.email || "",
                phone_code: authReducer.user?.phone_code || "",
                phone_number: authReducer.user?.phone_number || "",
                gender: authReducer.user?.gender || "",
                country: authReducer.user?.country || "",
                city: authReducer.user?.city || "",
                dob: authReducer.user?.dob || "",
                address: authReducer.user?.address || ""
            });
        }
    }, [authReducer]);
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            phone_code: "",
            phone_number: "",
            gender: "",
            country: "",
            city: "",
            dob: "",
            address: ""
        },
        enableReinitialize: true,
        validationSchema: updateUserValidation,
        onSubmit: async (values) => {
            const cleanData = removeKeysByValues({ ...values, image_url: profileImageUrl }, [null, "", undefined, 0])
            const payload = await dispatch(updateUser(cleanData));
            if (payload?.success) {
                toast.success("Profile updated successfully.");
            }
        }
    })

    const handleDeleteUser = () => setShowDeleteModal(true)
    const handleConfirmDelete = async () => {
        const payload = await dispatch(deleteUser());
        if (payload?.success) {
            setShowDeleteModal(false);
            toast.success("Account deleted successfully.");
            navigate("/login");
        }
    }

    return (
        <div className='p-5'>

            <div className='profile-title pl-4'>
                <h3>Profile</h3>
                <p>Add Or Edit Your Profile Details</p>
            </div>
            <form onSubmit={formik.handleSubmit}>
                <div className='position-relative d-flex align-item-center mt-3'>
                    <Avatar
                        alt="User Name"
                        src={profileImageUrl || authReducer.user?.image_url}
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
                    <p>Take or Upload profile photo</p>
                </div>
                <div className='profile-container mt-5 d-flex '>
                    <div className='input-container'>
                        <h4>First Name</h4>
                        <TextField
                            className='profile-input mt-4'
                            name='first_name'
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            sx={{
                                height: "10px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiInputBase-input": {
                                    height: "100%",
                                    padding: "15px",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {formik.touched.first_name && formik.errors.first_name && (
                            <span className="text-error d-flex mt-5 flex-direction-column">{formik.errors.first_name}</span>
                        )}
                    </div>
                    <div className='input-container'>
                        <h4>Last Name</h4>
                        <TextField
                            type='text'
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            className='profile-input mt-5'
                            sx={{
                                height: "10px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiInputBase-input": {
                                    height: "100%",
                                    padding: "15px",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {formik.touched.last_name && formik.errors.last_name && (
                            <span className="text-error d-flex mt-5 flex-direction-column">{formik.errors.last_name}</span>
                        )}
                    </div>
                    <div className='input-container'>
                        <h4>Email</h4>
                        <TextField
                            type='email'
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            className='profile-input mt-5'
                            sx={{
                                height: "10px",
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiOutlinedInput-root:hover": {
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#cbc9c9",
                                },
                                "& .MuiInputBase-input": {
                                    height: "100%",
                                    padding: "15px",
                                },
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <span className="text-error d-flex mt-5 flex-direction-column">{formik.errors.email}</span>
                        )}
                    </div>
                    <div className='input-container mt-5'>
                        <h4>Country</h4>
                        <select
                            name="country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            className='profile-input border-radius-10'
                        >
                            <option value="">Select country</option>
                            {countries?.map((country, index) => (
                                <option key={country.value + index} value={country.value}>{country.label}</option>
                            ))}
                        </select>
                        {formik.touched.country && formik.errors.country && (
                            <span className="text-error d-flex mt-5 flex-direction-column">{formik.errors.country}</span>
                        )}
                    </div>
                    <div className='input-container mt-5'>
                        <h4>City</h4>
                        <input
                            type='text'
                            name="city"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            className='profile-input border-radius-10 pl-3'
                        />
                        {formik.touched.city && formik.errors.city && (
                            <span className="text-error d-flex mt- flex-direction-column">{formik.errors.city}</span>
                        )}
                    </div>
                    <div className='input-container mt-5'>
                        <h4>Date of birth</h4>
                        <input
                            type='date'
                            name="dob"
                            value={formik.values.dob}
                            onChange={formik.handleChange}
                            className='profile-input border-radius-10 p-3'
                        />
                        {formik.touched.dob && formik.errors.dob && (
                            <span className="text-error d-flex flex-direction-column">{formik.errors.dob}</span>
                        )}
                    </div>
                    <div className='input-container'>
                        <h4>Address</h4>
                        <input
                            type='text'
                            name="address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            className='profile-input border-radius-10 pl-3'
                        />
                        {formik.touched.address && formik.errors.address && (
                            <span className="text-error d-flex flex-direction-column">{formik.errors.address}</span>
                        )}
                    </div>
                    <div className='input-container'>
                        <h4>Gender</h4>
                        <select
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            className='profile-input border-radius-10'
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="prefer no to say">Prefer No To Say</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && (
                            <span className="text-error d-flex flex-direction-column">{formik.errors.gender}</span>
                        )}
                    </div>
                    <div className='input-container'>
                        <h4>Phone Number</h4>
                        <div className='phoneno-input d-flex'>
                            <select className='code-input border-radius-10'
                                name="phone_code"
                                value={formik.values.phone_code}
                                onChange={formik.handleChange}
                            >
                                {countryPhoneCodes.map((code, index) => (
                                    <option
                                        key={code.value + index}
                                        value={code.value}
                                    >
                                        {code.label}</option>
                                ))}
                            </select>
                            <div className='input-container'>
                                <input
                                    name="phone_number"
                                    value={formik.values.phone_number}
                                    onChange={formik.handleChange}
                                    className='phone-numbe-input profile-input border-radius-10 ml-2 pl-3'
                                />
                            </div>
                        </div>
                        {formik.touched.phone_number && formik.errors.phone_number && (
                            <span className="text-error d-flex flex-direction-column">{formik.errors.phone_number}</span>
                        )}
                    </div>
                </div>
                <div className='user-profile-btn mt-3 d-flex justify-content-end'>
                    <button
                        type="button"
                        className='user-cancel-btn cancel-btn border-radius-5'
                        onClick={() => handleDeleteUser()}
                    >
                        Delete Account
                    </button>
                    <button type="submit" className='user-save-btn submit-btn border-radius-5 ml-2'>Update Account</button>
                </div>
            </form>
            {showDeleteModal && (
                <Modal open={showDeleteModal}>
                    <div className="delete-modal border-radius-10">
                        <ConfirmDeleteModal
                            description='Do you really want to delete your account? This process cannot be undone.'
                            title="Are You sure?"
                            onConfirm={handleConfirmDelete}
                            onCancel={() => setShowDeleteModal(false)}
                        />
                    </div>
                </Modal>
            )}
        </div>
    )
}
export default Setting;