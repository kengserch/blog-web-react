import React, { useState, useEffect, useContext } from "react";
import ProfileModal from "../components/ProfileModal";
import axios from "axios";
import { AuthContext } from "../context/authContext";

const Profile = () => {
    const { isLoading, userId } = useContext(AuthContext);
    const [isProfile, setProfile] = useState(false);
    const [profileData, setProfileData] = useState(null);

    const handleProfile = () => {
        setProfile(true);
    };

    useEffect(() => {
        if (!userId) {
            return;
        }

        const fetchProfile = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/profiles/${userId}`);
                if (response.data.profile) {
                    setProfileData(response.data.profile);
                } else {
                    console.error("Profile not found");
                }
            } catch (err) {
                console.error("Error fetching profile data:", err);
            }
        };

        fetchProfile();
    }, [userId]); 

    if (isLoading || !userId || !profileData) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (!profileData) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <p className="text-lg text-gray-500">Profile not found. Please create your profile.</p>
                <button className="px-4 py-1 bg-lime-300 rounded-3xl" onClick={handleProfile}>
                    <h1 className="text-black font-bold">Create Profile</h1>
                </button>
                {isProfile && <ProfileModal setProfile={setProfile} />}
            </div>
        );
    }

    return (
        <section className="pt-28 lg:pt-28">
            <div className="container max-w-screen-xl mx-auto items-center">
                <div className="flex justify-end">
                    <button className="px-4 py-1 bg-lime-300 rounded-3xl" onClick={handleProfile}>
                        <h1 className="text-black font-bold">Edit Profile</h1>
                    </button>
                    {isProfile && <ProfileModal setProfile={setProfile} />}
                </div>

                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-xl mt-3">{profileData.full_name || "Fullname"}</h1>
                    <figure className="img-box w-40 h-40 rounded-full ring-2 ring-blue-500">
                        <img src={profileData.avatar_url ? profileData.avatar_url : "./images/hand-drawn.avif"} alt="Profile Avatar" className="img-cover rounded-full" />
                    </figure>
                    <div className="flex flex-col items-center">
                        <h1 className="text-2xl">{profileData.username || "Username"}</h1>
                        <h1 className="text-xl">Email: {profileData.email || "example@email.com"}</h1>
                    </div>
                    <div className="flex flex-col gap-2 max-w-xl text-center bg-zinc-800 rounded-xl p-4">
                        <h1 className="text-xl">Bio</h1>
                        <p>{profileData.bio || "This user hasn't written a bio yet. Add some information about yourself!"}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Profile;
