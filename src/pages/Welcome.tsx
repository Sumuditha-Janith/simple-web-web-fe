import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-3xl font-bold">Welcome</h1>

      <div className="flex gap-4 mt-4">
        <Link
          to="/login"
          className="px-6 py-2 bg-white text-black rounded-xl font-semibold"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="px-6 py-2 bg-gray-300 text-black rounded-xl font-semibold"
        >
          Register
        </Link>
      </div>
    </div>
  )
}