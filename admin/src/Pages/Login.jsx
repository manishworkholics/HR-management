import React, { useState } from 'react'
import Logo from '../assets/images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import callAPI from '../Pages/Common_Method/api';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username || !password) {
            setError("Please fill in both email and password");
            return;
        }


        setError("");
        setIsLoading(true);

        try {
            const response = await callAPI.post("/admin/login", { username, password});
            const data = response.data;
            if (response.status === 200) { 
                localStorage.setItem("authToken", data.token);
                toast.success("Login successful!");
                setTimeout(() => {
                    navigate("/hr-management/dashboard");
                }, 2000);
            } else {
                toast.error(data.message || "Login failed, please try again.");
                setError(data.message || "Login failed, please try again.");
            }
        } catch (error) {
            toast.error("An error occurred. Please try again later.");
            setError("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="login-page">
                <div className="container h-100">
                <ToastContainer position="top-right" autoClose={3000} />
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
                            <div className="card border-0 rounded-5 shadow bg-ffffff94">
                                <div className="card-body p-3 p-md-4 p-xl-5">
                                    <div className="text-center mb-3">
                                        <Link to="/dashboard">
                                            <img src={Logo} alt="Logo" width="280" className='' />
                                        </Link>
                                    </div>
                                    <h2 className="fs-6 fw-normal text-center text-secondary mb-4">Sign in to your account</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="row gy-2 overflow-hidden">
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input type="text" className="form-control" name="username" id="username" placeholder="name@123"
                                                        value={username}
                                                        onChange={(e) => setUsername(e.target.value)}
                                                        required />
                                                    <label htmlFor="text" className="form-label">User Name</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="form-floating mb-3">
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        name="password"
                                                        id="password"
                                                        placeholder="Password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        required
                                                    />
                                                    <label htmlFor="password" className="form-label">Password</label>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-flex gap-2 justify-content-between">
                                                    <div className="form-check">
                                                        <input
                                                            className="form-check-input"
                                                            type="checkbox"
                                                            name="rememberMe"
                                                            id="rememberMe"
                                                            checked={rememberMe}
                                                            onChange={(e) => setRememberMe(e.target.checked)}
                                                        />
                                                        <label className="form-check-label text-secondary" htmlFor="rememberMe">
                                                            Keep me logged in
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <div className="d-grid my-3">
                                                    <button type="submit" className="btn btn-danger btn-lg" disabled={isLoading}>
                                                        {isLoading ? "Logging in..." : "Log in"}
                                                    </button>
                                                </div>
                                            </div>
                                            {error && (
                                                <div className="col-12">
                                                    <div className="alert alert-danger">{error}</div>
                                                </div>
                                            )}
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login