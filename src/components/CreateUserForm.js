import React, { useState } from 'react'

import { useForm } from '../hooks/useForm';
import { InputDate } from '../components/InputDate';
import { Alert } from '../components/Alert'
import usersApi from '../api/usersApi';

export const CreateUserForm = ({ users, setUsers, hideForm }) => {
    const [error, setError] = useState(null);
    const { name, dateBirth, idNumber, onChange, clearInput } = useForm({
        name: '',
        dateBirth: '',
        idNumber: ''
      })

    /* Create New User */
    const handleFormSubmit = async (e) => {
        e.preventDefault()
        setError(null);
        try {
            const { data: { data } } = await usersApi.post('/v2-users',
                { data: { name, dateBirth, idNumber } });


            clearInput();
            setUsers([
                ...users,
                data
            ])

        } catch ({ code }) {
            if (code === "ERR_BAD_REQUEST")
                setError("All fields are riquered")
        }
    }
    return (
        <section className='mb-2'>
            <div className='card'>
                <div className='card-body'>
                    {error && <Alert message={error} />} 

                    <h3>Create User</h3>
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
                            <button type="submit" className="btn btn-primary me-md-2">Create new user</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
