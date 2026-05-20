import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import API from "../services/api";

function CreatePost() {

    const navigate = useNavigate();

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);

    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        if (!image) {
            return alert("Please select image");
        }

        try {

            setLoading(true);

            const formData = new FormData();

            formData.append("caption", caption);
            formData.append("image", image);

            await API.post(
                "/posts/create",
                formData
            );

            alert("Post created");

            navigate("/");

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                "Failed to create post"
            );

        } finally {

            setLoading(false);
        }
    }

    return (
        <div>

            <Navbar />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "50px",
                }}
            >

                <form
                    onSubmit={handleSubmit}
                    style={{
                        width: "400px",
                        background: "white",
                        padding: "30px",
                        borderRadius: "10px",
                        boxShadow:
                            "0 0 10px rgba(0,0,0,0.1)",
                    }}
                >

                    <h2
                        style={{
                            marginBottom: "20px",
                        }}
                    >
                        Create Post
                    </h2>

                    <textarea
                        placeholder="Write caption..."
                        value={caption}
                        onChange={(e) =>
                            setCaption(e.target.value)
                        }
                        rows="4"
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            marginBottom: "15px",
                            borderRadius: "5px",
                        }}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                            setImage(e.target.files[0])
                        }
                        required
                        style={{
                            marginBottom: "20px",
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: "100%",
                            padding: "12px",
                            background: "black",
                            color: "white",
                            border: "none",
                            borderRadius: "5px",
                            cursor: "pointer",
                        }}
                    >
                        {
                            loading
                                ? "Creating..."
                                : "Create Post"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}

export default CreatePost;