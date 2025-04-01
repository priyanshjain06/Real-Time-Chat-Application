import axios from "axios";
import Sticker from "../models/sticker.model.js";

export const searchGiphy = async (req, res) => {
  const query = req.query.q || "funny";
  const limit = req.query.limit || 10;
  const apiKey = process.env.GIPHY_API_KEY;

  const url = `https://api.giphy.com/v1/stickers/search?api_key=${apiKey}&q=${encodeURIComponent(
    query
  )}&limit=${limit}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    const stickers = data.data.map((item) => ({
      giphyId: item.id,
      title: item.title,
      url: item.images.fixed_height.url,
    }));

    const savedStickers = [];
    for (const sticker of stickers) {
      let stickerDoc = await Sticker.findOne({ giphyId: sticker.giphyId });
      if (!stickerDoc) {
        stickerDoc = new Sticker(sticker);
        await stickerDoc.save();
      }
      savedStickers.push(stickerDoc);
    }

    const responseData = savedStickers.map((sticker) => ({
      _id: sticker._id,
      id: sticker.giphyId,
      title: sticker.title,
      url: sticker.url,
    }));

    res.json({
      success: true,
      data: responseData,
    });
  } catch (error) {
    console.error("Error in GIPHY controller:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch or save GIPHY data",
      error: error.response ? error.response.data : error.message,
    });
  }
};