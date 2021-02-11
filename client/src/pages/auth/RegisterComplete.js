import React, { useState, useEffect } from "react";
import { auth } from '../../firebase'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import { createOrUpdateUser } from '../../functions/auth'


const RegisterComplete = ({ history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {user} = useSelector(state => ({...state}))
    const dispatch = useDispatch()

    useEffect(()=>{
        setEmail(window.localStorage.getItem('emailForRegistration'))
        // console.log(window.location.href)
        // console.log(window.localStorage.getItem('emailForRegistration'))
    },[history])

    const handleSubmit = async (e) => {
        e.preventDefault()
        //validation
        if (!email || !password) {
            toast.error('почта или пароль не могут быть пустыми!')
            return
        }
        if(password.length<6) {
            toast.error('пароль не должен быть меньше 6 символов')
        }
        try{
            const result = await auth.signInWithEmailLink(email, window.location.href)
            // console.log(result)
            if(result.user.emailVerified) {

                // remove user email from localStorage
                window.localStorage.removeItem('emailForRegistration')
                // get user IdToken
                let user = auth.currentUser
                await user.updatePassword(password)
                const idTokenResult = await user.getIdTokenResult()
                // redux store
                createOrUpdateUser(idTokenResult.token)
                .then(
                    response => {
                        // send email and token to reducer
                        dispatch({
                            type: "LOGGED_IN_USER",
                            payload: {
                                name: response.data.name,
                                email: response.data.email,
                                token: idTokenResult.token,
                                role: response.data.role,
                                _id: response.data._id,
                            },
                        });
                    }
                )
                .catch()
                // redirect
                history.push('/')
            }
        } catch (error){
            // console.log(error)
            toast.error(error.message)
        }
    };



    const completeRegistrationForm = () => (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                className="form-control"
                value={email}
                disabled
            />

            <input
                type="password"
                className="form-control"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoFocus
            />
            <br/>
            <button type="submit" className="btn btn-raised">
                Register Complete
            </button>
        </form>
    );

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h4>Complete Registration</h4>
                    {completeRegistrationForm()}
                </div>
            </div>
        </div>
    );
};

export default RegisterComplete;
