import { useEffect, useState } from 'react';
import './App.css';

import { Header } from './components/Header'
import { Alert } from './components/Alert'
import { Icon } from './components/Icon';
import userApi from './api/usersApi'
import { CreateUserForm } from './components/CreateUserForm';
import { UpdateUserForm } from './components/UpdateUserForm';
import { ConfirmAlert } from './components/ConfirmAlert';


function App() {

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [users, setUsers] = useState([]);
  const [showCreateUser, setShowCreateUser] = useState(false)
  const [showUpdateUser, setShowUpdateUser] = useState(false)
  const [userIdForUpdate, setUserIdForUpdate] = useState()


  /* Get All user from API */
  const getUsers = async () => {
    setError(null);
    try {
      const { data: { data, meta }, status } = await userApi.get('/v2-users', { params: { "pagination[pageSize]": 10 } });
      console.log(meta)
      
      if (status !== 200)
        throw new Error();

      setUsers(data);
    } catch (error) {
      setError("There is error with user API ")
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  /* Handle for edit user */
  const handleEditUser = (id) => {
    setUserIdForUpdate(id);
    setShowUpdateUser(true)
  }

  /* Handle for delete user */
  const handleDeleteUser = async (id) => {
    setError(null);
    try {
      await userApi.delete(`/v2-users/${id}`);

      setSuccess("User deleted sucessfull");
      setTimeout(() => setSuccess(null), 1500);
    } catch (error) {
      setError("There is error with user API ")
    }
  }



  return (
    <>
      {/* Header */}
      <Header title="CRUD Users FrontEnd" />

      {error && <Alert message={error} />}
      {success && <Alert message={success} type="success" />}

      {showCreateUser && <CreateUserForm users={users} setUsers={setUsers} hideForm={setShowCreateUser} />}
      {(showUpdateUser && userIdForUpdate) && <UpdateUserForm users={users} setUsers={setUsers} hideForm={setShowUpdateUser} idUser={userIdForUpdate} />}


      <section>
        <div className="card">
          <div className="card-body">
            <div className="d-flex justify-content-between mb-4">
              <h3>List Users</h3>
              <button className="btn btn-primary bt-sm" onClick={() => setShowCreateUser(true)}><Icon icon="faPlus" /></button>
            </div>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Date of Birth</th>
                    <th scope="col">ID Number</th>
                    <th scope="col">Date Created</th>
                    <th scope="col">Options</th>
                  </tr>
                </thead>
                <tbody>
                  {users && users.map(user => {
                    const { id, attributes } = user

                    return (
                      <tr key={id}>
                        <td>{attributes.name}</td>
                        <td>{new Date(attributes.dateBirth).toDateString()}</td>
                        <td>{attributes.idNumber}</td>
                        <td>{new Date(attributes.publishedAt).toDateString()}</td>
                        <td>
                          <div className="btn-group btn-group-sm" role="group">
                            <button type="button" className="btn btn-warning" onClick={() => handleEditUser(id)}><Icon icon="faPenToSquare" /></button>
                            <ConfirmAlert onClickDelete={() => handleDeleteUser(id)} />
                          </div>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
              <div className='btn-group btn-group-sm'>
                  <button type="button" className='btn btn-outline-primary'></button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
