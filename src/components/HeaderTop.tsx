import { useEffect, useState } from "react";
import { BsFacebook, BsTwitter, BsInstagram, BsYoutube } from "react-icons/bs";
const HeaderTop = () => {
  const [name,setName]=useState<string>("");
  const token = localStorage.getItem("accessToken");
  const user:any = localStorage.getItem("User");
  console.log(user)
  useEffect(()=>{
    if(token!==null){
      setName(JSON.parse(user).name)
    }
  },[token]);
  return (
    <div className="border-b border-gray-200 hidden sm:block">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="hidden lg:flex gap-1">
            <div className="header_icon_wrapper">
              <BsFacebook />
            </div>
            <div className="header_icon_wrapper">
              <BsInstagram />
            </div>
            <div className="header_icon_wrapper">
              <BsTwitter />
            </div>
            <div className="header_icon_wrapper">
              <BsYoutube />
            </div>
          </div>
          <div className="text-gray-500 text-[12px]">
            <b>FREE SHIPPING</b> THIS WEEK ORDER OVER - &#8377;500.
          </div>
          
          <div className="flex gap-4">
          {
            token&&<div className="text-gray-500">{name}</div>
          }
            <select
              className="text-gray-500 text-[12px] w-[70px]"
              name="currency"
              id="currency"
            >
              {/* <option value="USD">&#36;</option>
              <option value="EUR">&#8364;</option> */}
              <option value="INR">&#8377;</option>
            </select>

            <select
              className="text-gray-500 text-[12px] w-[80px]"
              name="language"
              id="language"
            >
              <option value="english">English</option>
              {/* <option value="hindi">Hindi</option> */}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
