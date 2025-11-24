import axios from "axios"
import React, { useState, type FormEvent } from "react"
import { register } from "../services/auth"
import { data, useNavigate } from "react-router-dom"

export default function Register() {
  // state - component data
  // useState is react hook, for manage state
  const navigate = useNavigate()

  const [firstname, setFirstname] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [conPassword, setConPassword] = useState("")
  const [role, setRole] = useState("USER")

  const handleRgister = async (e: FormEvent) => {
    e.preventDefault() // ignore page refresh

    if (!firstname || !lastname || !email || !password || !conPassword) {
      // find alert libraries
      alert("All fields are required.")
      return
    }

    if (password !== conPassword) {
      alert("Password do not match.")
      return
    }

    try {
      const obj = {
        firstname,
        lastname,
        email,
        password,
        role
      }
      const res: any = await register(obj)
      console.log(res.data)
      console.log(res.message)

      alert(`Reginstration successful! Email: ${res?.data?.email}`)
      //  const navigate = useNavigate()
      navigate("/login")

      // const response = await axios.post(
      //   "http://localhost:5000/api/v1/auth/register",
      //   {
      //     firstname, //firstname: firstname
      //     lastname,
      //     email,
      //     password,
      //     role
      //   },
      //   {
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   }
      // )
      // console.log(response)
    } catch (err: any) {
      console.error(err?.response?.data)
    }
  }

  return (
    <div>
      <h1>Register as User or Author</h1>
      <input
        type="text"
        placeholder="firstname"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <input
        type="text"
        placeholder="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
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
      <input
        type="password"
        placeholder="confirm password"
        value={conPassword}
        onChange={(e) => setConPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="USER">User</option>
        <option value="AUTHOR">Author</option>
      </select>
      <button onClick={handleRgister}>Register</button>
    </div>
  )
}
