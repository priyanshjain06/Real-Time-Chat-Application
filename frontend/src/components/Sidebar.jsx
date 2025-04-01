import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside
      className="h-full w-16 sm:w-20 md:w-24 lg:w-72 border-r border-base-300 
      flex flex-col transition-all duration-200 bg-base-100"
    >
      {/* Header Section */}
      <div className="border-b border-base-300 w-full p-3 sm:p-4 md:p-5">
        <div className="flex items-center justify-center lg:justify-start gap-2">
          <Users className="size-5 sm:size-6 md:size-7" />
          <span className="font-medium text-sm sm:text-base md:text-lg hidden lg:block">
            Contacts
          </span>
        </div>
        {/* Online Filter Toggle */}
        <div className="mt-2 sm:mt-3 flex items-center justify-center lg:justify-start gap-2">
          <label className="cursor-pointer flex items-center gap-1 sm:gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-xs sm:checkbox-sm md:checkbox-md"
            />
            <span className="text-xs sm:text-sm md:text-base hidden md:block">
              Show online only
            </span>
          </label>
          <span className="text-xs text-zinc-500 hidden md:block">
            ({onlineUsers.length - 1} online)
          </span>
        </div>
      </div>

      {/* Users List */}
      <div className="overflow-y-auto w-full py-2 sm:py-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              w-full p-2 sm:p-3 md:p-4 flex items-center justify-center lg:justify-start gap-2 sm:gap-3
              hover:bg-base-300 transition-colors duration-200
              ${
                selectedUser?._id === user._id
                  ? "bg-base-300 ring-1 ring-base-400"
                  : ""
              }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-10 sm:size-12 md:size-14 lg:size-12 object-cover rounded-full"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-2 sm:size-3 md:size-4 
                  bg-green-500 rounded-full ring-1 sm:ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User Info - Visible on Larger Screens */}
            <div className="hidden lg:block text-left min-w-0 flex-1">
              <div className="font-medium text-sm md:text-base truncate">
                {user.fullName}
              </div>
              <div className="text-xs md:text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-3 sm:py-4 text-xs sm:text-sm md:text-base">
            No online users
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;