import { useState, type FormEvent } from "react"
import { getMyDetails, login } from "../services/auth"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/authContext"

export default function Login() {
  const navigate = useNavigate()

  const { setUser } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault()

    if (!email || !password) {
      alert("ALl fields are re...")
      return
    }

    try {
      const res = await login(email, password)
      console.log(res.data.accessToken)

      if (!res.data.accessToken) {
        alert("Login fail")
        return
      }
      
      await localStorage.setItem("accessToken", res.data.accessToken)
      await localStorage.setItem("refreshToken", res.data.refreshToken)

      // import { getMyDetails, login } from "../services/auth"
      const detail = await getMyDetails()

      // save userdata redux
      // auth contex
      setUser(detail.data)

      navigate("/home")
    } catch (err) {
      console.error(err)
    }
    // api call
    // redirect to /home
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </div>
  )
}
