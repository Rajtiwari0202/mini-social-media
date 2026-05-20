import { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import API from "../services/api";

function Home() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function fetchPosts() {

        try {

            const response = await API.get("/posts");

            setPosts(response.data.posts);

        } catch (error) {

            console.log(error);

        } finally {

            setLoading(false);
        }
    }

    useEffect(() => {

        fetchPosts();

    }, []);

    return (
        <div
            style={{
                background: "#f4f4f4",
                minHeight: "100vh",
            }}
        >

            <Navbar />

            <div
                style={{
                    maxWidth: "600px",
                    margin: "30px auto",
                }}
            >

                <h1
                    style={{
                        marginBottom: "20px",
                    }}
                >
                    Social Feed
                </h1>

                {
                    loading ? (
                        <h3>Loading posts...</h3>
                    ) : posts.length === 0 ? (
                        <h3>No posts yet</h3>
                    ) : (
                        posts.map((post) => (

                            <div
                                key={post._id}
                                style={{
                                    background: "white",
                                    borderRadius: "10px",
                                    marginBottom: "25px",
                                    overflow: "hidden",
                                    boxShadow:
                                        "0 0 10px rgba(0,0,0,0.1)",
                                }}
                            >

                                <img
                                    src={post.image}
                                    alt="post"
                                    style={{
                                        width: "100%",
                                        height: "400px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div
                                    style={{
                                        padding: "15px",
                                    }}
                                >

                                    <h3
                                        style={{
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {post.user?.username}
                                    </h3>

                                    <p
                                        style={{
                                            marginBottom: "10px",
                                        }}
                                    >
                                        {post.caption}
                                    </p>

                                    <p>
                                        ❤️ {post.likes.length} likes
                                    </p>

                                </div>

                            </div>
                        ))
                    )
                }

            </div>

        </div>
    );
}

export default Home;