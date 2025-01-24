'use client'

import { GlobalContext } from "@/Context";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase/firebase"
import { useContext, useEffect, useState } from "react";
import Page from "@/app/Signin/page"

const Profile = () => {

  const { authuser, setauthuser } = useContext(GlobalContext)
  const [userfirstletter, setuserfirstletter] = useState("")

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setauthuser(user)
        sessionStorage.setItem('user', JSON.stringify(user))
        const firstletter = user?.email
        const firstletterwithcap = firstletter.charAt(0).toUpperCase()
        setuserfirstletter(firstletterwithcap)
      }
      else {
        console.log("no user found")
        setauthuser(null)
      }
    })
    return () => unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      sessionStorage.clear()
    }
    catch (error) {
      console.error(error)
    }
  }

  return (
    authuser === null ?
      (
        <Page/>
      )
      :
      <div className="flex flex-col items-center justify-center h-full bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h2 className="text-2xl font-semibold mb-6 text-center">Profile</h2>
          <div className="flex flex-col items-center mb-6">
            <div className=" flex items-center justify-center rounded-full w-20 h-20 mb-4 border-2  bg-green-700">
              <div>
                <p className="text-4xl text-white">{userfirstletter}</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 ">{authuser?.email}</p>
          </div>
          <button onClick={logout} className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition">Log Out</button>
        </div>
      </div>
    );
  };

export default Profile;
