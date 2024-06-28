import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/auth'
import { login, logout } from './store/authSlice'
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'


const App = () => {

  // console.log(import.meta.env.VITE_APPWRITE_URL) //THIS IS THE WAY TO ACCESS THE ENCIRONMENT VARIABLES 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))

        }
        else {
          dispatch(logout())
        }
      })
      .finally(()=>{
        setLoading(false)
      })

  }, [])


  return !loading ?(
    <div className='bg-gray-400 min-h-screen flex flex-wrap content-between '>
      <div className="w-full block">

        <Header/>
        <main>
         <Outlet/>
        </main>
        <Footer/>
      </div>
      

    </div>
  ):null
}

export default App
