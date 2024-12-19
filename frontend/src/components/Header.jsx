import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/authContext";

const Header = () => {
    const { isAuthenticated, handleLogout, user, isLoading: authLoading, hasProfile } = useAuth();
    const [showMenu, setShowMenu] = useState(false);
    const [profileData, setProfileData] = useState(null);
    const [isFetching, setIsFetching] = useState(false);

    const navigate = useNavigate();

    const menuToggle = () => {
        setShowMenu((prev) => !prev);
    };

    const handleProfileClick = () => {
        setShowMenu(false);
        navigate("/profile");
    };

    useEffect(() => {
        if (!user || !hasProfile) {
            return;
        }

        const fetchProfile = async () => {
            setIsFetching(true);
            try {
                const response = await axios.get(`http://localhost:8000/api/profiles/${user}`);
                if (response.data.profile) {
                    setProfileData(response.data.profile);
                } else {
                    console.error("Profile not found");
                }
            } catch (error) {
                console.error("Error fetching profile data:", error);
            } finally {
                setIsFetching(false);
            }
        };

        fetchProfile();
    }, [user, hasProfile]);

    // if (authLoading || isFetching) {
    //     return (
    //         <div className="flex items-center justify-center h-screen">
    //         </div>
    //     );
    // }

    return (
        <header className="fixed top-0 left-0 w-full h-20 flex items-center z-40 bg-zinc-950">
            <div className="max-w-screen-xl w-full mx-auto flex justify-between items-center">
                <div>
                    <Link to="/">
                        <figure className="w-24 h-auto flex items-center">
                            <img src="/images/webboard-logo.png" width={80} alt="Logo" />
                        </figure>
                    </Link>
                </div>
                <div className="flex gap-2 mr-6">
                    {!isAuthenticated ? (
                        <Link to="/login">
                            <button className="px-4 py-1 bg-lime-300 rounded-3xl">
                                <h1 className="text-black font-bold">Login</h1>
                            </button>
                        </Link>
                    ) : (
                        <div className="relative">
                            <div className="flex items-center gap-3 cursor-pointer" onClick={menuToggle}>
                                <figure className="img-box w-10 h-10 rounded-full ring-2 ring-blue-500 relative">
                                    <img src={profileData?.avatar_url || "./images/hand-drawn.avif"} alt="Profile Avatar" className="img-cover" />
                                </figure>
                                <h1 className="bg-zinc-800 py-2 pl-8 pr-4 -ml-8 rounded-2xl">{profileData?.username || "Guest User"}</h1>
                            </div>
                            <div className={`w-44 h-auto bg-zinc-900 absolute rounded-lg inset-x-0 mt-2 origin-top transform transition-transform ease-in-out duration-75 ${showMenu ? "scale-y-100" : "scale-y-0"}`}>
                                <div className="flex px-2 py-1 flex-col gap-1 cursor-pointer">
                                    <h1 className="px-1 py-1 hover:bg-zinc-600 hover:rounded-md" onClick={handleProfileClick}>
                                        Profile
                                    </h1>

                                    <h1 className="px-1 py-1 hover:bg-zinc-600 hover:rounded-md" onClick={handleLogout}>
                                        Logout
                                    </h1>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
