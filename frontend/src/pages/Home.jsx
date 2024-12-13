import React, { useState, useContext } from "react";
import Filter from "../components/Filter";
import Hasetag from "../components/Hasetag";
import PostCard from "../components/PostCard";
import CreatePostModal from "../components/CreatePostModal";
import { AuthContext } from "../context/authContext";
import { useNavigate} from "react-router";

const Home = () => {
    let navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);
    const [isCreatedPostOpen, setCreatePost] = useState(false);

    const handleCreatePostClick = () => {
        if (isAuthenticated) {
            setCreatePost(true);
        } else {
            alert("Please log in to create a post.");
            navigate("/login");
        }
    };

    return (
        <section className="pt-28 lg:pt-28">
            <div className="container max-w-screen-xl mx-auto items-center">
                <div className="grid grid-cols-4 gap-10  relative">
                    <Filter />
                    <div className="col-span-2 flex flex-col p-4 h-auto rounded-xl">
                        <div className="flex justify-end">
                            <button className="px-4 py-2 bg-lime-300 rounded-3xl" onClick={handleCreatePostClick}>
                                <h1 className="text-black font-bold">Create post</h1>
                            </button>
                            {isCreatedPostOpen && <CreatePostModal setCreatePost={setCreatePost} />}
                        </div>
                        <PostCard />
                    </div>
                    <Hasetag />
                </div>
            </div>
        </section>
    );
};

export default Home;
