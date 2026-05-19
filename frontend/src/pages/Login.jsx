import { useState } from "react";
import API from "../services/api";

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            console.log(response.data);

            localStorage.setItem(
                "token",
                response.data.token
            );

            alert("Login successful");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-2xl shadow-lg w-[400px]"
            >

                <h1 className="text-3xl font-bold mb-6 text-center">
                    Login
                </h1>

                <div className="mb-4">

                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                    />

                </div>

                <div className="mb-6">

                    <label className="block mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        name="password"
                        placeholder="Enter password"
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full border border-gray-300 p-3 rounded-lg outline-none"
                    />

                </div>

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;