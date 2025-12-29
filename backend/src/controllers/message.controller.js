import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import Sticker from "../models/sticker.model.js";
import multer from "multer";
import sharp from "sharp";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    // REVIEW user from middleware

    //Find all users whose _id is NOT equal to loggedInUserId
    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

//For chat messages between two users, and returns human-readable data
export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id; // db document id 
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
      .populate("sticker", "giphyId title url")
      .populate("senderId", "username")
      .populate("receiverId", "username");

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadChatImage = upload.single("image");

export const sendMessage = async (req, res) => {
  try {
    const { text, stickerId } = req.body;
    const { id: receiverId } = req.params; //REVIEW - 
    const senderId = req.user._id;
    let imageUrl = null;

    if (req.file) {
      const compressedImage = await sharp(req.file.buffer)
        .resize(800)
        .jpeg({ quality: 70 })
        .toBuffer();

      //REVIEW - why promise ? upload stream do not return  a promise 

      const uploadResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({ folder: "chat_images" }, (error, result) =>
            error ? reject(error) : resolve(result)
          )
          .end(compressedImage); //REVIEW to signal upload is completed
      });

      imageUrl = uploadResponse.secure_url; //REVIEW we are fething secure url from  object returned by above promise of uploadstream
    }

    let sticker = null;
    if (stickerId) {
      sticker = await Sticker.findById(stickerId);
      if (!sticker) {
        return res.status(400).json({ error: "Invalid sticker ID" });
      }
    }

    //REVIEW - 
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || null,
      image: imageUrl,
      sticker: sticker ? sticker._id : null, //REVIEW - 
    });

    await newMessage.save();

    await newMessage.populate("sticker", "giphyId title url");
    //REVIEW - newMessage is populated so that the receiver (and sender) immediately gets full, usable data (sticker details) instead of just an ObjectId.

    //REVIEW - 
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.error("❌ Error in sendMessage:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};