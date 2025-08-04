import React from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { Box, Calendar, GraduationCap, Home, Wallet, ClipboardList } from 'lucide-react'

export default function Navbar() {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleRedirect = (route: string) => {
    navigate(route, { replace: true });
  }
  return (
    <div className='bg-black hidden xl:flex flex-col xl:w-[5%] h-screen border-r-[1px] border-[#B388FF]/30'>
      <div className='border-[1px] border-[#B388FF] rounded-md overflow-hidden w-[60%] aspect-square items-center justify-center flex  mx-auto mt-5'><Box className='text-shadow-lg' color='#B388FF' /></div>
      <div className='h-[45%] w-full flex flex-col items-center justify-evenly border-t-[#B388FF]/30 border-t-[1px] mt-6'>
        <div
          onClick={() => handleRedirect("/")}
          className={`border-[1px] rounded-md overflow-hidden w-[60%] aspect-square flex items-center justify-center ${pathname === "/"
            ? "border-[#B388FF] "
            : "border-white/20 hover:border-white/40"
            }`}
        >
          <Home color={pathname === "/" ? "#B388FF" : "white"} />
        </div>
        <div
          onClick={() => handleRedirect("expense-tracker")}
          className={`border-[1px] rounded-md overflow-hidden w-[60%] aspect-square flex items-center justify-center ${pathname === "/expense-tracker"
            ? "border-[#B388FF] "
            : "border-white/20 hover:border-white/40"
            }`}
        >
          <Wallet color={pathname === "/expense-tracker" ? "#B388FF" : "white"} />
        </div>
        <div
          onClick={() => handleRedirect("events")}
          className={`border-[1px] rounded-md overflow-hidden w-[60%] aspect-square flex items-center justify-center ${pathname === "/events"
            ? "border-[#B388FF] "
            : "border-white/20 hover:border-white/40"
            }`}
        >
          <Calendar color={pathname === "/events" ? "#B388FF" : "white"} />
        </div>
        <div
          onClick={() => handleRedirect("school-dashboard")}
          className={`border-[1px] rounded-md overflow-hidden w-[60%] aspect-square flex items-center justify-center ${pathname === "/school-dashboard"
            ? "border-[#B388FF] "
            : "border-white/20 hover:border-white/40"
            }`}
        >
          <GraduationCap color={pathname === "/school-dashboard" ? "#B388FF" : "white"} />
        </div>
        <div
          onClick={() => handleRedirect("chores")}
          className={`border-[1px] rounded-md overflow-hidden w-[60%] aspect-square flex items-center justify-center ${pathname === "/chores"
            ? "border-[#B388FF] "
            : "border-white/20 hover:border-white/40"
            }`}
        >
          <ClipboardList color={pathname === "/chores" ? "#B388FF" : "white"} />
        </div>
      </div>
    </div>
  )
}
