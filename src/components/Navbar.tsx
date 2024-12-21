import { useState } from "react";
import { BiUser } from "react-icons/bi";
import { FaHome, FaBars } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../custom-hooks/reduxHook";
import { logout } from "../redux/feature/authSlice";

const Navbar = () => {
  const token = localStorage.getItem("accessToken");
  const [showCategories, setShowCategories] = useState(false);
  const dispatch = useAppDispatch();
  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };
  const logoutUser = () => {
    localStorage.removeItem("User");
    localStorage.removeItem("accessToken");
    dispatch(logout());
    // navigate("/login");
    window.location.reload();
  };
  return (
    <>
      {/* Top Navbar for Large Screens */}
      <div className="hidden lg:block">
        <div className="container">
          <div className="flex w-fit gap-10 mx-auto font-medium py-4 text-blackish">
            <Link className="navbar_link relative" to="/">
              HOME
            </Link>
            <Link className="navbar_link relative" to="/mens-collection">
              MEN&apos;S COLLECTION
            </Link>
            <Link className="navbar_link relative" to="/womens-collection">
              WOMEN&apos;S COLLECTION
            </Link>
            <Link className="navbar_link relative" to="/jewelery">
              JEWELRY
            </Link>
            <Link className="navbar_link relative" to="/electronics">
              ELECTRONICS
            </Link>
            
              
            
          </div>
        </div>
      </div>

      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg z-50 ">
        <nav className="py-2 px-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <Link
              to="/"
              className="flex items-center gap-1 text-gray-700 hover:text-blue-500"
            >
              <FaHome className="text-3xl" />
            </Link>
            <BiUser className="text-3xl text-gray-600 hover:text-blue-500 cursor-pointer" />
            <FiHeart className="text-3xl text-gray-600 hover:text-blue-500 cursor-pointer" />
            <HiOutlineShoppingBag className="text-3xl text-gray-600 hover:text-blue-500 cursor-pointer" />
            <button
              onClick={toggleCategories}
              className="text-gray-600 hover:text-blue-500"
            >
              <FaBars className="text-3xl" />
            </button>
          </div>
        </nav>

        {/* Dropdown menu when toggle button is clicked */}
        {showCategories && (
          <ul className="bg-gray-50 py-2 px-4 border-t border-gray-200">
            <li className="py-1 hover:bg-gray-100">
              <Link
                to="/mens-clothing"
                className="text-gray-700 text-xl hover:text-blue-500"
              >
                Men&apos;s Collection
              </Link>
            </li>
            <li className="py-1 hover:bg-gray-100">
              <Link
                to="/womens-clothing"
                className="text-gray-700 text-xl hover:text-blue-500"
              >
                Women&apos;s Collection
              </Link>
            </li>
            <li className="py-1 hover:bg-gray-100">
              <Link
                to="/jewelery"
                className="text-gray-700 text-xl hover:text-blue-500"
              >
                Jewelry
              </Link>
            </li>
            <li className="py-1 hover:bg-gray-100">
              <Link
                to="/electronics"
                className="text-gray-700 text-xl hover:text-blue-500"
              >
                Electronics
              </Link>
            </li>
            {token&&<li className="py-1 hover:bg-gray-100">
              <div
                className="text-gray-700 text-xl hover:text-blue-500 cursor-pointer"
                onClick={logoutUser}
              >
                logout
              </div>
            </li>}
          </ul>
        )}
      </div>
    </>
  );
};

export default Navbar;
