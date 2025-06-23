import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import Spinner from '../helpers/Spinner'

const User = () => {
  const url = "http://localhost:8000/api/users/"
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(url)
        const users = await response.json()
        console.log(users)
        setUsers(users)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchUser()
  }, [])

  function deleteUser(user) {
    toast((t) => (
      <span>
        ¿Do you want to delete to <b>{user.name}</b>?
        <br />
        <button className='btn btn-danger' onClick={() => {
          setIsLoading(true)          
          const requestOptions = {
            method: "delete"            
          }
          fetch(url+ user._id, requestOptions)
            .then(response => {
              if (response.ok)
                return response.json()
              else
                throw response.json()
            })
            .then(data => {
              //console.log(data)
              const userId = user._id
              //setUsers((prevUser) => prevUser.filter((user) => user._id !== userId))
              setUsers(users.filter(user => user._id !== userId))
              toast.success(data.message, { position: 'top-right' })
            })
            .catch(error => {
              toast.error(error.message, { position: 'top-right' })
            })
            .finally(() => setIsLoading(false))
          toast.dismiss(t.id)
        }}>
          Delete
        </button>
      </span>
    ));
  }

  return (
    <div className='container'>

      <Link to="/users/add" className='btn btn-primary'><i className="fa-solid fa-user-plus"></i></Link>

      {isLoading ? <Spinner /> :
        <table className='table table-bordered mt-4'>
          <thead>
            <tr>
              <th scope='col'></th>
              <th scope='col'>Name</th>
              <th scope='col'>email</th>
              <th scope='col'>Address</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td className='text-center'>
                    <Link to={`/users/${user._id}/edit`} className='btn btn-warning text-white me-3'>
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Link>

                    <button onClick={() => deleteUser(user)} className='btn btn-danger text-white'>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
    </div>
  )
}

export default User