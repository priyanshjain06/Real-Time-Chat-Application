import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5001" : "/";
//REVIEW for the socket

//REVIEW set,get where get is used to access the states of the store in the same file !
export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");

      set({ authUser: res.data });
      get().connectSocket(); //REVIEW
    } catch (error) {
      console.log("Error in checkAuth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data }); //REVIEW
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      //REVIEW loading state is set to false !
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data }); //REVIEW
      toast.success("Logged in successfully");

      get().connectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null }); //REVIEW
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (file) => {
    set({ isUpdatingProfile: true });

    try {
      const formData = new FormData();
      formData.append("profilePic", file);
      console.log("Sending FormData:", formData.get("profilePic"));
      //REVIEW we have used the put method here
      const res = await axiosInstance.put("/auth/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      set({ authUser: res.data }); //REVIEW Update the store with new user data
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("Error updating profile:", error);
      toast.error(er.response?.data?.message || "Update failed");
    } finally {
      set({ isUpdatrroingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get(); //REVIEW here get is used to access the states of the store !
    if (!authUser || get().socket?.connected) return;

    //FIXME look at this syntax
    const socket = io(BASE_URL, {
      query: {
        userId: authUser._id,
      },
    });
    socket.connect();

    set({ socket: socket });

    //REVIEW it means socket is listening for the events
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
