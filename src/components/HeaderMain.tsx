import { useEffect, useState } from "react";
import { BiLogOut, BiUser } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import logo from "../assets/logo_transparent.png";
import { CgLogIn, CgProfile } from "react-icons/cg";
import { useAppDispatch } from "../custom-hooks/reduxHook";
import { logout } from "../redux/feature/authSlice";
import { useNavigate } from "react-router-dom";

const HeaderMain = () => {
  const dispatch = useAppDispatch();
  const [isDropdownOpen, setDropdownOpen] = useState(false); // State to handle dropdown visibility
  const navigate = useNavigate();
  
const [name,setName]=useState<string>("");
  const token = localStorage.getItem("accessToken");
  const user:any = localStorage.getItem("User");
  console.log(user)
  useEffect(()=>{
    if(token!==null){
      setName(JSON.parse(user).name)
    }
  },[token]);
  //   const parsedToken = token ? JSON.parse(token) : null;  // Handle the case when token is null
  //   const parsedUser = user ? JSON.parse(user) : null;
  console.log(token, user);
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };
  const logoutUser = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("accessToken");
    dispatch(logout());
    window.location.reload();

    // navigate("/login");
  };
  const navitateToLogin = () => {
    navigate("/login");
  };
  return (
    <div className="border-b border-gray-200 py-6">
      <div className="container sm:flex sm:justify-between items-center">
        <div className={`font-bold text-4xl text-center pb-4 sm:pb-0 text-blackish flex ${token?"justify-between":"justify-between"}`}>
          <img className="lg:w-[130px] w-[50px] h-[30px] lg:h-[60px]" src={logo}  alt="Shop logo" />
          {!token ? (
            <div
              className="lg:hidden pr-6 text-slate-700  flex text-[15px] cursor-pointer justify-start items-center gap-2 hover:text-slate-500"
              onClick={navitateToLogin}
            >
              <CgLogIn /> login
            </div>
          ):(<div className="text-gray-500 text-[10px] lg:hidden">{name}</div>)}
        </div>
        <div className="w-full sm:w-[300px] md:w-[70%] relative">
          <input
            className="border-gray-200 border p-2 px-4 rounded-lg w-full"
            type="text"
            placeholder="enter product name"
          />
          <BsSearch
            className="absolute right-0 top-0 mr-3 mt-3 text-gray-400"
            size={20}
          />
        </div>
        {token ? (
          <div className="hidden lg:flex gap-4 text-gray-500 text-[30px]">
            <div className="relative" onClick={toggleDropdown}>
              <BiUser />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-md shadow-lg w-30 text-[15px]">
                  <ul>
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-2">
                      <CgProfile /> Profile
                    </li>
                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex justify-start items-center gap-2"
                      onClick={logoutUser}
                    >
                      <BiLogOut />
                      Logout
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <div className="relative">
              <FiHeart />
              <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                0
              </div>
            </div>
            <div className="relative">
              <HiOutlineShoppingBag />
              <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white grid place-items-center translate-x-1 -translate-y-1">
                0
              </div>
            </div>
          </div>
        ) : (
          <div
            className=" pr-6 hidden lg:flex text-[15px] cursor-pointer justify-start items-center gap-2 hover:text-slate-500"
            onClick={navitateToLogin}
          >
            <CgLogIn /> login
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderMain;
