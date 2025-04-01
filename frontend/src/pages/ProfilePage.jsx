import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedImg(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append("profilePic", file);

    await updateProfile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 via-base-200 to-base-300 pt-20 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      <div
        className="w-full max-w-2xl mx-auto p-6 sm:p-8 bg-base-300/80 backdrop-blur-md rounded-2xl shadow-2xl border border-base-100/20 animate-fade-in"
      >
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
            Your Profile
          </h1>
          <p className="mt-2 text-base-content/70 text-sm sm:text-base animate-fade-in-up">
            Manage your personal information
          </p>
        </div>

        {/* Avatar Upload Section */}
        <div
          className="flex flex-col items-center gap-6 mb-10 animate-fade-in hover:scale-[1.05] transition-transform duration-300 ease-spring"
        >
          <div className="relative group">
            <img
              src={selectedImg || authUser.profilePic || "/avatar.png"}
              alt="Profile"
              className="size-32 sm:size-40 rounded-full object-cover border-4 border-primary/20 group-hover:border-primary/50 shadow-lg transition-all duration-300"
            />
            <label
              htmlFor="avatar-upload"
              className={`
                absolute bottom-0 right-0 
                bg-gradient-to-r from-primary to-secondary 
                p-3 rounded-full cursor-pointer 
                shadow-md hover:shadow-xl hover:scale-110 
                transition-all duration-300 ease-in-out
                ${isUpdatingProfile ? "animate-pulse pointer-events-none opacity-70" : ""}
              `}
            >
              <Camera className="w-6 h-6 text-white" strokeWidth={2} />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUpdatingProfile}
              />
            </label>
          </div>
          <p className="text-sm sm:text-base text-base-content/60 italic animate-fade-in-up">
            {isUpdatingProfile
              ? "Uploading your new photo..."
              : "Click the camera to update your avatar"}
          </p>
        </div>

        {/* Profile Info */}
        <div className="space-y-6 animate-fade-in">
          <div className="space-y-3 group">
            <div className="text-sm sm:text-base text-base-content/70 flex items-center gap-3">
              <User
                className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-dark group-hover:scale-110 transition-all duration-200"
                strokeWidth={2}
              />
              <span className="font-medium">Full Name</span>
            </div>
            <p className="px-4 py-3 bg-base-200/50 rounded-lg border border-base-100/20 shadow-inner text-sm sm:text-base group-hover:bg-base-200 group-hover:shadow-md transition-all duration-300">
              {authUser?.fullName}
            </p>
          </div>

          <div className="space-y-3 group">
            <div className="text-sm sm:text-base text-base-content/70 flex items-center gap-3">
              <Mail
                className="w-5 h-5 sm:w-6 sm:h-6 text-primary group-hover:text-primary-dark group-hover:scale-110 transition-all duration-200"
                strokeWidth={2}
              />
              <span className="font-medium">Email Address</span>
            </div>
            <p className="px-4 py-3 bg-base-200/50 rounded-lg border border-base-100/20 shadow-inner text-sm sm:text-base group-hover:bg-base-200 group-hover:shadow-md transition-all duration-300">
              {authUser?.email}
            </p>
          </div>
        </div>

        {/* Account Information */}
        <div
          className="mt-10 bg-base-300/50 rounded-xl p-6 shadow-lg border border-base-100/10 animate-fade-in hover:scale-[1.02] transition-transform duration-300"
        >
          <h2 className="text-lg sm:text-xl font-semibold text-primary mb-4 animate-slide-in-left">
            Account Information
          </h2>
          <div className="space-y-4 text-sm sm:text-base">
            <div className="flex items-center justify-between py-2 border-b border-base-100/20 group">
              <span className="text-base-content/70 group-hover:text-base-content transition-colors duration-200">
                Member Since
              </span>
              <span className="font-medium bg-base-200/30 px-3 py-1 rounded-full shadow-sm group-hover:bg-base-200 group-hover:shadow-md transition-all duration-300">
                {authUser.createdAt?.split("T")[0]}
              </span>
            </div>
            <div className="flex items-center justify-between py-2 group">
              <span className="text-base-content/70 group-hover:text-base-content transition-colors duration-200">
                Account Status
              </span>
              <span className="text-green-500 font-medium bg-green-500/10 px-3 py-1 rounded-full shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;