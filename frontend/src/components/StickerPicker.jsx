import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import { X } from "lucide-react";

const StickerPicker = ({ onSelect }) => {
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStickers = async () => {
      try {
        const res = await axiosInstance.get("/giphy/search?q=funny&limit=15");

        setStickers(res.data.data);
      } catch (error) {
        console.error("Error fetching stickers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStickers();
  }, []);

  return (
    <div className="absolute bottom-full left-0 right-0 bg-base-100 p-4 border rounded-lg shadow-lg max-w-sm mx-auto">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-bold">Select a Sticker</h3>
        <button onClick={() => onSelect(null)} className="text-red-500">
          <X />
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-2">
          {stickers.map((sticker) => (
            <img
              key={sticker.id}
              src={sticker.url}
              alt={sticker.title}
              className="w-16 h-16 cursor-pointer hover:scale-105 transition"
              onClick={() => onSelect(sticker)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StickerPicker;