import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"

const AddUser = () => {
    const form = {
        name: "",
        email: "",
        address: ""
    }
    const [user, setUser] = useState(form)
    const inputHandler = (e) => {
        const { name, value } = e.target
        setUser({ ...user, [name]: value })
    }
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const submitForm = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            //console.log(user)
            const headers = new Headers()
            headers.append("Content-Type", "application/json")
            const requestOptions = {
                method: "post",
                body: JSON.stringify(user),
                headers: headers
            }
            const response = await fetch("http://localhost:8000/api/users", requestOptions)
            if (response.ok) {
                const data = await response.json()
                console.log(data)
                navigate("/")
                toast.success(data.message, { position: 'top-right' })
            } else {
                throw await response.json()
            }
        } catch (error) {
            toast.error(error.message, { position: 'top-right' })
            console.log(error)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className='container'>

            <div className='card'>
                <div className='card-header'>
                    <h3>Add new user</h3>
                </div>
                <div className='card-body'>
                    <form onSubmit={submitForm}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">* Email address</label>
                            <input type="email" className="form-control" name="email" placeholder="name@example.com" onChange={inputHandler} disabled={isLoading} />
                        </div>

                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">* Name</label>
                            <input type="text" className="form-control" name="name" placeholder="John Doe" onChange={inputHandler} disabled={isLoading}/>
                        </div>

                        <div className="mb-3">
                            <label htmlFor="address" className="form-label">* Address</label>
                            <input type="text" className="form-control" name="address" placeholder="No where" onChange={inputHandler} disabled={isLoading}/>
                        </div>

                        <div className="mb-3">
                            <label className="form-label"></label>
                            <Link to="/">Back</Link> |
                            {!isLoading ?
                                <button className='btn btn-primary'>Save</button>
                                :
                                <button className="btn btn-primary" type="button" disabled>
                                    A time, please 
                                    <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                                    <span className="visually-hidden" role="status">Loading...</span>
                                </button>
                            }
                        </div>
                    </form>
                </div>
            </div>

        </div>
    )
}

export default AddUser