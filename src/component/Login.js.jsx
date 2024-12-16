import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { AuthContext } from "../global/AuthContext";
const Login = () => {

    const [csrfToken, setCsrfToken] = useState("");
    useEffect(() => {
        fetchCsrfToken().then((token) => {
            setCsrfToken(token);
        });
    }, []);



    const fetchCsrfToken = () => {
        return axios.get("http://localhost:8000/auth/csrf-token",{withCredentials:true})
            .then((response) => {
                    return response.data.token
            })
            .catch((error) => {
                console.error("Error fetching CSRF token:", error);
                return null;
            });
    };

    return (
        <div className={"SignIn"}>
            <Form csrfToken={csrfToken} />
        </div>
    );
};

const Form = ({ csrfToken }) => {
    const { login } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); // Initialize useNavigate
    const handleSubmit = (e) => {
        e.preventDefault();

        const config = {
            headers: {
                "X-CSRF-TOKEN" : csrfToken
            },
            withCredentials: true
        }

        axios.post("http://localhost:8000/auth/login", {username,password},config)
            .then((response) => {
                console.log("Login successful:", response.data);
                login(response.data.token,username);
                navigate("/dashboard");
            })
            .catch((error) => console.error("Submission error:", error));
    };
    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <h1 className="text-center">Login</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary w-100 mt-3">
                                Login
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
