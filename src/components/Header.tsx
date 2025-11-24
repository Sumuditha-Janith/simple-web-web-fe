import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function Header() {
  const navigate = useNavigate()
  const { user } = useAuth()

  const handleLogin = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
  }

  return (
    <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
      <div className="flex space-x-4">
        <Link to="/home" className="hover:underline">
          Home
        </Link>
        <Link to="/post" className="hover:underline">
          Post
        </Link>
        {/* () && () */}
        {(user.roles?.includes("ADMIN") || user.roles?.includes("AUTHOR")) && (
          <Link to="/my-post" className="hover:underline">
            My Post
          </Link>
        )}
        {/* {user.roles?.includes("ADMIN") || user.roles?.includes("AUTHOR") ? (
          <Link to="/my-post" className="hover:underline">
            My Post
          </Link>
        ) : null} */}
      </div>
      <div className="flex items-center space-x-4">
        <span>{user?.email}</span>
        <button
          onClick={handleLogin}
          className="bg-white text-blue-500 px-2 py-1"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
