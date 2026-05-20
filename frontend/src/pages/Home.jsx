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

    async function handleLike(postId) {

        try {

            await API.post(
                `/posts/${postId}/like`
            );

            fetchPosts();

        } catch (error) {

            console.log(error);
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
                                    borderRadius: "15px",
                                    marginBottom: "30px",
                                    overflow: "hidden",
                                    boxShadow:
                                        "0 4px 15px rgba(0,0,0,0.08)",
                                }}
                            >

                                <img
                                    src={post.image}
                                    alt="post"
                                    style={{
                                        width: "100%",
                                        height: "450px",
                                        objectFit: "cover",
                                    }}
                                />

                                <div
                                    style={{
                                        padding: "20px",
                                    }}
                                >

                                    <div
                                        style={{
                                            display: "flex",
                                            justifyContent:
                                                "space-between",
                                            alignItems: "center",
                                            marginBottom: "10px",
                                        }}
                                    >

                                        <h3>
                                            @{post.user?.username}
                                        </h3>

                                        <small>
                                            {
                                                new Date(
                                                    post.createdAt
                                                ).toLocaleDateString()
                                            }
                                        </small>

                                    </div>

                                    <p
                                        style={{
                                            marginBottom: "15px",
                                            lineHeight: "1.5",
                                        }}
                                    >
                                        {post.caption}
                                    </p>

                                    <button
                                        onClick={() =>
                                            handleLike(post._id)
                                        }
                                        style={{
                                            border: "none",
                                            background: "black",
                                            color: "white",
                                            padding: "10px 18px",
                                            borderRadius: "8px",
                                            cursor: "pointer",
                                            marginBottom: "15px",
                                        }}
                                    >
                                        ❤️ {post.likes.length} Likes
                                    </button>

                                    <div>

                                        <h4
                                            style={{
                                                marginBottom: "10px",
                                            }}
                                        >
                                            Comments
                                        </h4>

                                        {
                                            post.comments.length === 0 ? (
                                                <p>
                                                    No comments yet
                                                </p>
                                            ) : (
                                                post.comments.map(
                                                    (comment) => (

                                                        <div
                                                            key={
                                                                comment._id
                                                            }
                                                            style={{
                                                                marginBottom:
                                                                    "10px",
                                                                padding:
                                                                    "10px",
                                                                background:
                                                                    "#f4f4f4",
                                                                borderRadius:
                                                                    "8px",
                                                            }}
                                                        >

                                                            <strong>
                                                                @
                                                                {
                                                                    comment
                                                                        .user
                                                                        ?.username
                                                                }
                                                            </strong>

                                                            <p>
                                                                {
                                                                    comment.text
                                                                }
                                                            </p>

                                                        </div>
                                                    )
                                                )
                                            )
                                        }

                                    </div>

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