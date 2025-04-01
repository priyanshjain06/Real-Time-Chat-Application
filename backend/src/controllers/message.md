import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import multer from "multer";
import sharp from "sharp";

import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id; //REVIEW
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password"); //REVIEW ne is mongodb operator for not-eqaul to

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }); //REVIEW

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
const storage = multer.memoryStorage(); // Store in memory before processing
const upload = multer({ storage });

export const uploadChatImage = upload.single("image"); // Expect "image" field in form-data

export const sendMessage = async (req, res) => {
  try {
    const { text } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    let imageUrl = null;

    if (req.file) {
      // Compress & convert image
      const compressedImage = await sharp(req.file.buffer)
        .resize(800) // Resize width to 800px (adjust as needed)
        .jpeg({ quality: 70 }) // Convert to JPEG with 70% quality
        .toBuffer();

      // Upload to Cloudinary
      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "chat_images" }, (error, result) =>
            error ? reject(error) : resolve(result)
          )
          .end(compressedImage);
      });

      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    //REVIEW
    await newMessage.save();

    // Emit message via socket
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId)
      io.to(receiverSocketId).emit("newMessage", newMessage);

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("❌ Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
