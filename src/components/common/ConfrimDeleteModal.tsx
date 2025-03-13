import CloseIcon from '@mui/icons-material/Close';
import "./ConfrimDeleteModal.css";
import { ConfirmDeleteModalProps } from '../../pages/Setting/interface/delete-user.interface';

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
    title,
    description,
    onConfirm,
    onCancel,
    confirmLabel = "Delete",
    cancelLabel = "Cancel"
}) => {
    return (
        <div className="main-delete-content p-5">
            <div className="d-flex flex-direction-column align-item-center mt-4 justify-content-center">
                <CloseIcon sx={{
                    border: "6px solid red",
                    borderRadius: "50%",
                    fontSize: "650%",
                    fill: "red"
                }} />
                <h3 className="mt-2">{title}</h3>
                <p className="mt-2 font-size">{description}</p>
            </div>
            <div className="d-flex justify-content-center mt-5">
                <button className="delete-user-btn submit-btn border-radius-5" onClick={onCancel}>{cancelLabel}</button>
                <button className="delete-user-btn cancel-btn border-radius-5 ml-2" onClick={onConfirm}>{confirmLabel}</button>
            </div>
        </div>
    );
};