import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    async function handleSubmit(e) {

        e.preventDefault();

        try {

            const response = await API.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.token
            );

            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );

            alert("Login successful");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Login failed"
            );
        }
    }

    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "#f4f4f4",
            }}
        >

            <div
                style={{
                    width: "350px",
                    padding: "30px",
                    background: "white",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
                }}
            >

                <h1
                    style={{
                        textAlign: "center",
                        marginBottom: "20px",
                    }}
                >
                    Login
                </h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                email: e.target.value,
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                password: e.target.value,
                            })
                        }
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "15px",
                            borderRadius: "5px",
                            border: "1px solid #ccc",
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            width: "100%",
                            padding: "12px",
                            border: "none",
                            borderRadius: "5px",
                            background: "black",
                            color: "white",
                            cursor: "pointer",
                            fontSize: "16px",
                        }}
                    >
                        Login
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Login;