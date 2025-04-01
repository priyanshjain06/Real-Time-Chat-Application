import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef, useState } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Image, Loader2 } from "lucide-react";
import { MessageSquare } from "lucide-react";
const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [imageLoading, setImageLoading] = useState({});

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();
    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleImageLoad = (messageId) => {
    setImageLoading((prev) => ({ ...prev, [messageId]: false }));
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-base-100/50">
        <ChatHeader />
        <div className="flex-1 overflow-y-auto p-4 space-y-8">
          {[...Array(5)].map((_, i) => (
            <MessageSkeleton key={i} isOwn={i % 2 === 0} />
          ))}
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-64px)] bg-base-100/50">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.length === 0 && !isMessagesLoading && (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <div className="bg-primary/10 p-6 rounded-full mb-4">
              <MessageSquare
                className="w-10 h-10 text-primary"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">No messages yet</h3>
            <p className="text-base-content/70 max-w-md">
              Start the conversation by sending your first message to{" "}
              {selectedUser.fullName}
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
          >
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full border border-base-300/50 hover:border-primary/50 transition-all duration-200">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="profile"
                  className="hover:scale-105 transition-transform duration-200"
                />
              </div>
            </div>

            <div className="chat-header flex items-center space-x-2 mb-1">
              <span className="text-xs font-medium opacity-80">
                {message.senderId === authUser._id
                  ? "You"
                  : selectedUser.fullName}
              </span>
              <time className="text-xs opacity-50">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>

            <div
              className={`chat-bubble flex flex-col ${
                message.senderId === authUser._id
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 text-base-content"
              } rounded-2xl transition-all duration-200 hover:shadow-md`}
            >
              {message.image && (
                <div className="relative mb-2 rounded-lg overflow-hidden">
                  {imageLoading[message._id] !== false && (
                    <div className="absolute inset-0 bg-base-300/50 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  )}
                  <img
                    src={message.image}
                    alt="Attachment"
                    className={`max-w-full sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg rounded-lg ${
                      message.text ? "mb-2" : ""
                    }`}
                    onLoad={() => handleImageLoad(message._id)}
                    onError={() => handleImageLoad(message._id)}
                  />
                </div>
              )}
              {message.sticker && (
                <img
                  src={message.sticker.url}
                  alt={message.sticker.title}
                  className="w-16 h-16 rounded-lg mt-2"
                />
              )}  
              {message.text && (
                <p className="whitespace-pre-wrap break-words">
                  {message.text}
                </p>
              )}
            </div>

            <div className="chat-footer opacity-50 text-xs mt-1">
              {message.status === "sent" && "Sent"}
              {message.status === "delivered" && "Delivered"}
              {message.status === "read" && "Read"}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;