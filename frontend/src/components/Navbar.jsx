import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header
      className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-50 
      backdrop-blur-2xl bg-base-100/90 shadow-xl transition-all duration-500"
    >
      <div className="container mx-auto px-3 sm:px-4 h-14 sm:h-16 lg:h-18">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <Link
              to="/"
              className="group flex items-center gap-2 transition-all duration-300 
              hover:scale-105 hover:opacity-90"
            >
              <div
                className="size-8 sm:size-9 md:size-10 rounded-full bg-gradient-to-br 
                from-primary/40 to-primary/10 flex items-center justify-center shadow-lg 
                group-hover:shadow-2xl group-hover:ring-4 group-hover:ring-primary/30 
                transition-all duration-400"
              >
                <MessageSquare
                  className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-primary 
                  transition-transform duration-500 group-hover:rotate-[360deg] 
                  group-hover:scale-110"
                />
              </div>
              <h1
                className="text-base sm:text-lg md:text-xl font-extrabold text-white 
                drop-shadow-md"
              >
                Chatty
              </h1>
            </Link>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3">
            <Link
              to="/settings"
              className="btn btn-sm sm:btn-md gap-1 sm:gap-2 bg-base-200 
              text-white hover:bg-gradient-to-r hover:from-primary hover:to-primary/90 
              hover:text-zinc-100 hover:shadow-xl hover:scale-105 transition-all duration-400 
              rounded-full shadow-md border border-base-300"
            >
              <Settings
                className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 
                transition-transform duration-500 hover:rotate-[180deg] hover:text-zinc-100"
              />
              <span className="hidden md:inline text-sm sm:text-base">
                Settings
              </span>
            </Link>

            {/* Conditional Rendering for Authenticated Users */}
            {authUser && (
              <>
                <Link
                  to="/profile"
                  className="btn btn-sm sm:btn-md gap-1 sm:gap-2 bg-base-200 
                  text-white hover:bg-gradient-to-r hover:from-emerald-600 
                  hover:to-emerald-400 hover:text-zinc-100 hover:shadow-xl hover:scale-105 
                  transition-all duration-400 rounded-full shadow-md border border-base-300"
                >
                  <User
                    className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 
                    transition-transform duration-500 hover:scale-125 hover:text-zinc-100"
                  />
                  <span className="hidden md:inline text-sm sm:text-base">
                    Profile
                  </span>
                </Link>

                <button
                  className="btn btn-sm sm:btn-md gap-1 sm:gap-2 bg-base-200 
                  text-white hover:bg-gradient-to-r hover:from-red-600 
                  hover:to-red-400 hover:text-zinc-100 hover:shadow-xl hover:scale-105 
                  transition-all duration-400 rounded-full shadow-md border border-base-300"
                  onClick={logout}
                >
                  <LogOut
                    className="w-4 h-4 sm:w-5 sm:h-5 text-zinc-400 
                    transition-transform duration-500 hover:rotate-[360deg] hover:text-zinc-100"
                  />
                  <span className="hidden md:inline text-sm sm:text-base">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;