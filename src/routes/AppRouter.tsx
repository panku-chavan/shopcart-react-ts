import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../container/Home/Home'
import About from '../container/About/About'
import CategoryLayout from '../components/Layout/CategoryLayout'
import MensCollection from '../container/Categories/MenCollection/MensCollection'
import WomensCollection from '../container/Categories/WomensCollection/WomensCollection'
import Jewelery from '../container/Categories/Jewelery/Jewelery'
import Electronics from '../container/Categories/Electronics/Electronics'
import ProductDetails from '../container/Categories/ProductDetails'
import Register from '../container/Auth/Register'
import Login from '../container/Auth/Login'
import { useAppSelector } from '../custom-hooks/reduxHook'
import { RootState } from '../redux/store/store'



const AppRouter:React.FC = () => {
  const {user}=useAppSelector((state:RootState)=>state.auth);
  useEffect(() => {
    if (user) {
      console.log(user)
      const userObj={name:user?.displayName,email:user?.email,token:user?.stsTokenManager};
      localStorage.setItem("User",JSON.stringify(userObj));
      localStorage.setItem("accessToken",user?.accessToken);
    }
  }, [user]);
  
  return (
    <Routes>
       <Route path='/register' element={<Register/>}/>
       <Route path='/login' element={<Login/>}/>

        <Route path='/' element={<CategoryLayout><Home/></CategoryLayout> }/>
        <Route path='/mens-collection' element={<CategoryLayout><MensCollection/></CategoryLayout> }/>
        <Route path='/womens-collection' element={<CategoryLayout><WomensCollection/></CategoryLayout> }/>
        <Route path='/jewelery' element={<CategoryLayout><Jewelery/></CategoryLayout> }/>
        <Route path='/electronics' element={<CategoryLayout><Electronics/></CategoryLayout> }/>

        <Route path='/about' element={<About/>}/>
        <Route path='/product/:id' element={<ProductDetails/>}/>

    </Routes>
  )
}

export default AppRouter