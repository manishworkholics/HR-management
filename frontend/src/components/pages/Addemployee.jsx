import { useState } from "react";

const Addemployee = () => {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
        name: "",
        role: "admin",
        wages_per_day: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:4000/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            console.log("User Created:", result);
            alert("User successfully created!");
        } catch (error) {
            console.error("Error:", error.message);
            alert("Failed to create user!");
        }
    };

    return (
        <>
            <div className='container'>
                <div className='row'>
                    <div className="col-md-3"></div>
                    <div className='col-md-6'>
                        <div className="m-5">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Name:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Wages Per Day:</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        name="wages_per_day"
                                        value={formData.wages_per_day}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary">
                                    Submit
                                </button>
                            </form>

                        </div>

                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>


            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Addemployee