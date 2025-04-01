import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  // Add null check for selectedUser
  if (!selectedUser) return null;

  return (
    <div className="sticky top-0 z-10 p-3 border-b border-base-300 bg-base-100 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 max-w-[80%] sm:max-w-[70%]">
          <div className="avatar relative">
            <div className="size-12 sm:size-10 rounded-full">
              <img 
                src={selectedUser.profilePic || "/avatar.png"} 
                alt={selectedUser.fullName} 
                className="object-cover w-full h-full rounded-full" 
              />
              {/* Online status indicator */}
              {onlineUsers.includes(selectedUser._id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
          </div>

          <div className="truncate">
            <h3 className="font-medium text-base sm:text-sm truncate">
              {selectedUser.fullName}
            </h3>
            <p className="text-xs sm:text-sm text-base-content/70">
            {onlineUsers.includes(selectedUser._id) ?  (
                <span className="text-green-500">Online</span>
              ) : (
                <span className="text-gray-400">Offline</span>
              )}
            </p>
          </div>
        </div>

        <button 
          onClick={() => setSelectedUser(null)} 
          className="p-2 rounded-full hover:bg-base-200 transition duration-200"
          aria-label="Close chat"
        >
          <X className="w-5 h-5 sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;