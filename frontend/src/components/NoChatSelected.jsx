import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div
      className="w-full flex flex-1 flex-col items-center justify-center 
      p-4 sm:p-8 md:p-12 lg:p-16 bg-base-100/50 min-h-[200px]"
    >
      <div className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg text-center space-y-4 sm:space-y-6">
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-2 sm:mb-4">
          <div className="relative group">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 
              rounded-2xl bg-primary/10 flex items-center justify-center 
              animate-[bobTilt_0.8s_ease-in-out_infinite] shadow-md 
              transition-all duration-300 group-hover:bg-primary/40 
              group-hover:shadow-2xl group-hover:scale-115 group-hover:rotate-12 
              group-hover:border group-hover:border-primary/50"
            >
              <MessageSquare
                className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 lg:w-10 lg:h-10 
                text-primary transition-all duration-300 group-hover:scale-115 
                group-hover:text-primary/70 group-hover:rotate-6"
              />
              {/* Glow Effect on Hover */}
              <div
                className="absolute inset-0 rounded-2xl bg-primary/0 
                group-hover:bg-primary/20 group-hover:blur-md transition-all duration-300"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold 
          text-base-content drop-shadow-sm"
        >
          Welcome to Chatty!
        </h2>
        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl text-base-content/60 
          px-2 sm:px-4"
        >
          Select a conversation from the sidebar to start chatting
        </p>
      </div>

      {/* Custom Animation */}
      <style jsx>{`
        @keyframes bobTilt {
          0%, 100% {
            transform: translateY(0) rotate(-3deg);
          }
          50% {
            transform: translateY(-6px) rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default NoChatSelected;