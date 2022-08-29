import React from 'react'
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css
import { Icon } from './Icon';


export const ConfirmAlert = ({ onClickDelete }) => {

    const submit = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div 
                        className='modal fade show' 
                        tabIndex="-1"
                        style={{ display: 'block'}}
                    >
                        <div className='modal-dialog'>
                            <div className='modal-content'>
                                <div className="modal-body">
                                    <h3>Are you sure?</h3>
                                    <p>This action will delete the user.</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn" onClick={onClose}>Close</button>
                                    <button 
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => {
                                            onClickDelete();
                                            onClose();
                                        }}
                                    >
                                        Yes, Delete it !
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            }
        });
    };

    return (
        <button className="btn btn-danger" onClick={submit}><Icon icon="faTrash" /></button>
    )
}
