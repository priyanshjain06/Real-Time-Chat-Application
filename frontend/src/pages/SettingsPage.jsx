import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send, Check, Palette, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  {
    id: 2,
    content: "I'm doing great! Just working on some new features.",
    isSent: true,
  },
  {
    id: 3,
    content: "Check out this cool theme selector I'm building!",
    isSent: true,
  },
];

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="h-screen container mx-auto px-4 pt-8 pb-12 max-w-5xl">
      <div className="space-y-8">
        {/* Theme Selection Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <Palette size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Theme Preferences</h2>
              <p className="text-sm text-base-content/70">
                Customize your chat interface appearance
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {THEMES.map((t) => (
              <motion.button
                key={t}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`group flex flex-col items-center gap-2 p-3 rounded-xl transition-all
                  ${
                    theme === t
                      ? "bg-base-200 shadow-md"
                      : "hover:bg-base-200/50"
                  }`}
                onClick={() => setTheme(t)}
              >
                <div
                  className="relative h-10 w-full rounded-lg overflow-hidden shadow-sm"
                  data-theme={t}
                >
                  <div className="absolute inset-0 grid grid-cols-4 gap-px p-1.5">
                    <div className="rounded bg-primary"></div>
                    <div className="rounded bg-secondary"></div>
                    <div className="rounded bg-accent"></div>
                    <div className="rounded bg-neutral"></div>
                  </div>
                  {theme === t && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-1 right-1 bg-primary text-primary-content p-0.5 rounded-full"
                    >
                      <Check size={14} />
                    </motion.div>
                  )}
                </div>
                <span className="text-xs font-medium truncate w-full text-center">
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Preview Section */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10 text-primary">
              <MessageSquare size={20} />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Live Preview</h2>
              <p className="text-sm text-base-content/70">
                See how your theme looks in action
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-base-300 overflow-hidden bg-base-100 shadow-xl">
            <div className="p-6 bg-base-200/50">
              <div className="max-w-lg mx-auto">
                <div className="bg-base-100 rounded-xl shadow-sm overflow-hidden border border-base-300">
                  {/* Chat Header */}
                  <div className="px-5 py-3 border-b border-base-300 bg-base-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary flex items-center justify-center text-primary-content font-medium shadow">
                        J
                      </div>
                      <div>
                        <h3 className="font-medium">John Doe</h3>
                        <p className="text-xs text-base-content/70">Online</p>
                      </div>
                    </div>
                    <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-5 space-y-4 min-h-[250px] max-h-[250px] overflow-y-auto bg-base-100">
                    {PREVIEW_MESSAGES.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, x: message.isSent ? 20 : -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className={`flex ${
                          message.isSent ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl p-4 shadow-sm
                            ${
                              message.isSent
                                ? "bg-primary text-primary-content"
                                : "bg-base-200"
                            }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p
                            className={`text-xs mt-2 flex justify-end items-center gap-1
                              ${
                                message.isSent
                                  ? "text-primary-content/70"
                                  : "text-base-content/70"
                              }`}
                          >
                            <span>12:00 PM</span>
                            {message.isSent && (
                              <Check size={12} className="opacity-70" />
                            )}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Chat Input */}
                  <div className="p-4 border-t border-base-300 bg-base-100">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        className="input input-bordered flex-1 text-sm h-11 focus:ring-2 focus:ring-primary/50"
                        placeholder="Type a message..."
                        value="This is a preview"
                        readOnly
                      />
                      <button className="btn btn-primary h-11 min-h-0 px-4 shadow hover:shadow-md">
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SettingsPage;
