import React, { useState } from "react";
import UserNav from '../../components/nav/UserNav'
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
const Password = () => {
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState('')

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()
        auth.currentUser.updatePassword(password)
            .then(() => {
                setLoading(false)
                setPassword('')
                toast.success('Password updated')
            })
            .catch(err => {
                setLoading(false)
                toast.error(err.message)
            })
    }

    const passwordUpdateForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Your Password</label>
                <input
                    type="password"
                    className="form-control"
                    placeholder="Enter your password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    disabled={loading}
                />
            </div>
            <button className="btn btn-primary" disabled={!password || password.length < 6 || loading}>Submit</button>
        </form>
    )

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <UserNav />
                </div>
                <div className="col">
                    {loading ? <h4 className="text-danger">Loading...</h4> : <h4>Password update</h4>}
                    {passwordUpdateForm()}
                </div>
            </div>
        </div>
    )
};

export default Password;
