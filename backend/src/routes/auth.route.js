    import express from "express";
    import {
      checkAuth,
      login,
      logout,
      signup,
      updateProfile,
      uploadProfilePic
    } from "../controllers/auth.controller.js";
    import { protectRoute } from "../middleware/auth.middleware.js";

    const router = express.Router();

    router.post("/signup", signup);
    router.post("/login", login);
    router.post("/logout", logout);

    router.put(
      "/update-profile",
      uploadProfilePic,
      protectRoute,
      updateProfile
    ); 
    //REVIEW put method

    router.get("/check", protectRoute, checkAuth);

    export default router;
