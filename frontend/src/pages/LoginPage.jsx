import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useThemeStore } from "../store/useThemeStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, isLoggingIn, error } = useAuthStore();
  const { theme } = useThemeStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2" data-theme={theme}>
      {/* Form Section */}
      <div className="flex flex-col justify-center items-center min-h-screen p-4 sm:p-6 md:p-8 lg:p-12">
        <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg space-y-6 sm:space-y-8 animate-fade-in">
          {/* Branding */}
          <div className="text-center mb-6 sm:mb-8 group">
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 group-hover:shadow-xl group-hover:scale-105 group-hover:rotate-3 transition-all duration-300 ease-in-out">
                <MessageSquare
                  className="w-6 h-6 sm:w-8 sm:h-8 text-primary stroke-2 group-hover:text-primary-dark group-hover:drop-shadow-md transition-all duration-300"
                  strokeWidth={2}
                />
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-primary mt-2 animate-slide-in group-hover:text-primary-dark transition-colors duration-200">
                Welcome Back
              </h1>
              <p className="text-base-content/70 text-sm sm:text-base md:text-lg group-hover:text-base-content/90 transition-colors duration-200">
                Sign in to your account
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6 md:space-y-8">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-sm sm:text-base group-hover:text-primary transition-colors duration-200">
                  Email
                </span>
              </label>
              <div className="relative group">
                <Mail
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-base-content/40 group-hover:text-primary group-focus-within:text-primary transition-all duration-200"
                  strokeWidth={2}
                />
                <input
                  type="email"
                  className="input input-bordered w-full pl-9 sm:pl-10 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-lg group-hover:shadow-md group-hover:border-primary/50 transition-all duration-200"
                  placeholder="you@example.com"
                  aria-label="Email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-medium text-sm sm:text-base group-hover:text-primary transition-colors duration-200">
                  Password
                </span>
              </label>
              <div className="relative group">
                <Lock
                  className="absolute top-1/2 left-3 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-base-content/40 group-hover:text-primary group-focus-within:text-primary transition-all duration-200"
                  strokeWidth={2}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered w-full pl-9 sm:pl-10 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-primary focus:shadow-lg group-hover:shadow-md group-hover:border-primary/50 transition-all duration-200"
                  placeholder="••••••••"
                  aria-label="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute top-1/2 right-2 sm:right-3 transform -translate-y-1/2 p-1 sm:p-2 bg-gradient-to-r from-base-100 to-base-200 rounded-full border border-base-300/50 hover:border-primary hover:bg-primary/20 hover:shadow-lg hover:scale-110 transition-all duration-300 ease-in-out group-hover:ring-2 group-hover:ring-primary/30"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff
                      className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/60 hover:text-primary transition-all duration-200 hover:scale-105"
                      strokeWidth={2}
                    />
                  ) : (
                    <Eye
                      className="h-4 w-4 sm:h-5 sm:w-5 text-base-content/60 hover:text-primary transition-all duration-200 hover:scale-105"
                      strokeWidth={2}
                    />
                  )}
                </button>
              </div>
              {/* Forgot Password with New Hover Effect Options */}
              <div className="text-right mt-1 sm:mt-2 relative group">
                {/* Option 1: Glow Effect (Uncomment to use) */}
                {/* <Link
                  to="/forgot-password"
                  className="link link-primary text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary-dark hover:shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                >
                  Forgot Password?
                </Link> */}

                {/* Option 2: Bold Underline (Uncomment to use) */}
                {/* <Link
                  to="/forgot-password"
                  className="link link-primary text-xs sm:text-sm font-medium transition-all duration-300 ease-in-out hover:text-primary-dark hover:border-b-2 hover:border-primary"
                >
                  Forgot Password?
                </Link> */}

                {/* Current Default: Background Highlight with Lift (Active) */}
                <Link
                  to="/forgot-password"
                  className="link link-primary text-xs sm:text-sm font-medium relative transition-all duration-300 ease-in-out hover:text-primary-dark hover:-translate-y-0.5"
                >
                  Forgot Password?
                  <span className="absolute inset-0 -z-10 bg-primary/10 opacity-0 group-hover:opacity-100 rounded-md transition-opacity duration-200"></span>
                </Link>
              </div>
            </div>

            {error && (
              <div
                role="alert"
                aria-describedby="login-error"
                className="flex items-center justify-center gap-2 text-red-500 text-xs sm:text-sm bg-red-100/50 p-2 rounded-md border border-red-200 mt-2 hover:bg-red-100/70 transition-colors duration-200"
              >
                <span className="font-medium">Error:</span> {error}
              </div>
            )}

            <button
              type="submit"
              className="btn w-full bg-gradient-to-r from-primary via-primary/90 to-secondary text-white font-semibold text-sm sm:text-base md:text-lg rounded-full shadow-lg hover:bg-gradient-to-r hover:from-primary-dark hover:via-primary hover:to-secondary/80 hover:shadow-2xl hover:scale-105 hover:ring-4 hover:ring-primary/30 transition-all duration-300 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed ripple-btn py-2 sm:py-3"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? (
                <>
                  <Loader2
                    className="h-4 w-4 sm:h-5 sm:w-5 text-white animate-spin mr-2 hover:scale-110 transition-transform duration-200"
                    strokeWidth={2}
                  />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Create Account with Existing Effects */}
          <div className="text-center mt-4 group">
            <p className="text-base-content/70 text-xs sm:text-sm md:text-base hover:text-base-content/90 transition-colors duration-200">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="link link-primary font-semibold relative transition-all duration-300 ease-in-out hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-primary hover:to-secondary hover:scale-105 hover:drop-shadow-md group-hover:animate-pulse"
              >
                Create account
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <div className="hidden lg:block bg-gradient-to-br from-base-200/70 via-base-300/50 to-primary/10 min-h-screen transition-all duration-300 hover:from-base-200/80 hover:via-base-300/60 hover:to-primary/20">
        <AuthImagePattern
          title="Welcome back!"
          subtitle="Sign in to continue your conversations and catch up with your messages."
          className="flex flex-col justify-center items-center h-full text-center p-8"
        />
      </div>
    </div>
  );
};

export default LoginPage;