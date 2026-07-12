import { Outlet } from "react-router-dom";
import loginImage from "../assets/skin care beauty tips.jpg";

export default function AuthLayout() {
  return (
    <div className="grid min-h-screen md:grid-cols-2 bg-[#fffaf9]">

      {/* LEFT SIDE */}
      <div className="relative hidden md:block overflow-hidden">

        {/* Background Image */}
        <img
          src={loginImage}
          alt="GlowMatch"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-200/60 via-pink-100/30 to-white/20"></div>

        {/* Content */}
        <div className="relative z-10 flex h-full flex-col justify-between p-12">




        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center bg-[#fffaf9] p-6">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

    </div>
  );
}