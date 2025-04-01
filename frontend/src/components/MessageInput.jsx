import { useRef, useState, useCallback, memo, Suspense, lazy } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X, Smile } from "lucide-react";

// Lazy load heavy components with memoization
const StickerPicker = memo(lazy(() => import('./StickerPicker')));
const EmojiPickerButton = memo(lazy(() => import('./EmojiPicker')));

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedSticker, setSelectedSticker] = useState(null);
  const [isStickerPickerOpen, setIsStickerPickerOpen] = useState(false);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleStickerSelect = useCallback((sticker) => {
    setSelectedSticker(sticker);
    setIsStickerPickerOpen(false);
  }, []);

  const removeSticker = useCallback(() => {
    setSelectedSticker(null);
  }, []);

  const handleEmojiSelect = useCallback((emoji) => {
    setText(prev => prev + emoji);
  }, []);

  const handleSendMessage = useCallback(async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview && !selectedSticker) return;

    try {
      await sendMessage({
        text: text.trim() || null,
        image: imagePreview,
        stickerId: selectedSticker?._id || null,
      });

      setText("");
      setImagePreview(null);
      setSelectedSticker(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }, [text, imagePreview, selectedSticker, sendMessage]);

  return (
    <div className="p-3 sm:p-4 w-full bg-base-100 shadow-lg border-t border-zinc-700 relative">
      {selectedSticker && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative group">
            <img
              src={selectedSticker.url}
              alt={selectedSticker.title}
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-zinc-600 shadow-md"
              loading="lazy"
            />
            <button
              onClick={removeSticker}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white
              flex items-center justify-center shadow-md"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-center gap-2 sm:gap-3 w-full">
        <div className="flex-1 flex items-center gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-full input-sm sm:input-md bg-base-200"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <Suspense fallback={<div className="btn btn-circle btn-sm sm:btn-md animate-pulse bg-gray-200" />}>
            <EmojiPickerButton onEmojiSelect={handleEmojiSelect} />
          </Suspense>

          <button
            type="button"
            onClick={() => setIsStickerPickerOpen(!isStickerPickerOpen)}
            className="btn btn-circle btn-sm sm:btn-md text-zinc-400 hover:bg-zinc-700/20"
          >
            <Smile className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            ref={fileInputRef} 
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImagePreview(URL.createObjectURL(file));
            }}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-circle btn-sm sm:btn-md text-zinc-400 hover:bg-zinc-700/20"
          >
            <Image className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        <button
          type="submit"
          className="btn btn-circle btn-sm sm:btn-md bg-emerald-500 text-white"
          disabled={!text.trim() && !imagePreview && !selectedSticker}
        >
          <Send className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </form>

      {isStickerPickerOpen && (
        <Suspense fallback={<div className="p-4 bg-white rounded-lg shadow-lg">Loading stickers...</div>}>
          <StickerPicker onSelect={handleStickerSelect} />
        </Suspense>
      )}
    </div>
  );
};