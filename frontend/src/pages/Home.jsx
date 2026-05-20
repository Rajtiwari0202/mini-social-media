import Navbar from "../components/Navbar";

function Home() {

    return (
        <div>
            <Navbar />

            <div
                style={{
                    padding: "30px",
                }}
            >
                <h1>Welcome to Mini Social Media</h1>

                <p>
                    Feed will appear here.
                </p>
            </div>
        </div>
    );
}

export default Home;