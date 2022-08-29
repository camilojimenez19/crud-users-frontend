import React, { useEffect, useState } from 'react'

import { useForm } from '../hooks/useForm';
import { InputDate } from '../components/InputDate';
import { Alert } from '../components/Alert'
import usersApi from '../api/usersApi';

export const UpdateUserForm = ({ hideForm, idUser, getUser }) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const { name, dateBirth, idNumber, onChange, setValues } = useForm({
        name: '',
        dateBirth: '',
        idNumber: ''
    });

    const getUserByid = async () => {
        setError(null);
        setSuccess(null);
        try {
            const { data: { data }, status } = await usersApi.get(`/v2-users/${idUser}`);

            if (status !== 200)
                throw new Error();

            const { name, dateBirth: dateBirtText, idNumber } = data.attributes
            const dateBirth = new Date(dateBirtText);

            setValues({ name, dateBirth, idNumber });
            
        } catch (error) {
            setError("There is error with user API ")
        }
    }

    /* Create New User */
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError(null);
        setSuccess(null);
        try {

            if(name === "" || dateBirth === "" || idNumber === "" )
                throw new Error()
            
            await usersApi.put(`/v2-users/${idUser}`,
                { data: { name, dateBirth, idNumber } });

            setSuccess("User updated successfull");
            getUser();
        } catch (error) {
            setError("All fields are riquered")
        }
    }

    useEffect(() => {
        getUserByid();
    }, [])

    return (
        <section className='mb-2'>
            <div className='card'>
                <div className='card-body'>
                    {success && <Alert message={success} type="success"/>}
                    {error && <Alert message={error} />}

                    <h3>Update User</h3>
                    <form onSubmit={handleFormSubmit}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label"><small>Name</small></label>
                            <input type="text" className="form-control" onChange={({ target: { value } }) => onChange(value, 'name')} value={name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">Date of Birth</label>
                            <InputDate className="form-control" onChange={(date) => onChange(date, 'dateBirth')} date={dateBirth} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword1" className="form-label">ID Number</label>
                            <input type="number" className="form-control" onChange={({ target: { value } }) => onChange(value, 'idNumber')} value={idNumber} min={1} />
                        </div>
                        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                            <button type="button" className="btn btn-default" onClick={() => hideForm(false)}>Close</button>
                            <button type="submit" className="btn btn-primary me-md-2">Update user</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
