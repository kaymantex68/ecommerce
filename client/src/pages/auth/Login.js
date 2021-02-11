import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { createOrUpdateUser } from '../../functions/auth'




const Login = () => {
    const [email, setEmail] = useState("andrey.s.h.68@yandex.ru");
    const [password, setPassword] = useState("311774");
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();

    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        if (user && user.token) history.push("/");
    }, [user]);

    // function to redirect on admin or user
    const roleBasedRedirect = (response) => {
        if (response.data.role === 'admin') {
            history.push('/admin/dashboard')
        } else {
            history.push('/user/history')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            // enter with email and password
            const result = await auth.signInWithEmailAndPassword(email, password);
            // get user and token
            const { user } = result;
            const idTokenResult = await user.getIdTokenResult();

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
                        roleBasedRedirect(response)
                    }
                )
                .catch()
            // redirect to main page
            // history.push("/");
        } catch (error) {
            console.log(error);
            toast.error(error.message);
            setLoading(false);
        }
    };

    const loginForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    autoFocus
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                />
            </div>

            <br />
            <Button
                onClick={handleSubmit}
                type="primary"
                className="mb-3"
                block
                shape="round"
                icon={<MailOutlined />}
                size="large"
                disabled={!email || password.length < 6}
            >
                Login with email/password
      </Button>
        </form>
    );

    const googleLogin = async () => {
        auth
            .signInWithPopup(googleAuthProvider)
            .then(async (result) => {
                const { user } = result;
                const idTokenResult = await user.getIdTokenResult();
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
                            roleBasedRedirect(response)
                        }
                    )
                    .catch()
                // redirect to main page
                // history.push("/");
            })
            .catch((err) => {
                console.log(err);
                toast.error(err.message);
            });
    };

    return (
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (
                        <h4 className="text-danger">Loading ...</h4>
                    ) : (
                            <h4>Login</h4>
                        )}
                    {loginForm()}
                    <Button
                        onClick={googleLogin}
                        type="danger"
                        className="mb-3"
                        block
                        shape="round"
                        icon={<GoogleOutlined />}
                        size="large"
                    >
                        Login with Google
          </Button>
                    <Link to="/forgot/password" className="float-right text-danger">
                        Forgot Password
          </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
