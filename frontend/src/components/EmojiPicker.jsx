import { useState, useEffect } from 'react';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerButton = ({ onEmojiSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest('.emoji-picker-container') && 
          !e.target.closest('.emoji-trigger-button')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="emoji-trigger-button btn btn-circle btn-sm sm:btn-md text-zinc-400 hover:bg-zinc-700/20"
      >
        😊
      </button>

      {isOpen && (
        <div className="emoji-picker-container absolute bottom-14 left-0 z-20">
          <EmojiPicker
            onEmojiClick={(emojiData) => {
              onEmojiSelect(emojiData.emoji);
              setIsOpen(false);
            }}
            searchPlaceholder="Search emojis..."
            previewConfig={{ showPreview: false }}
            skinTonesDisabled
            theme="light"
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerButton;