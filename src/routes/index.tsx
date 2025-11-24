import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/authContext"
import Layout from "../components/Layout"

const Home = lazy(() => import("../pages/Home"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Welcome = lazy(() => import("../pages/Welcome"))
const Post = lazy(() => import("../pages/Post"))
const MyPost = lazy(() => import("../pages/MyPost"))

type RequireAuthTypes = { children: ReactNode; roles?: string[] }

// const RequireAuth = ({ children, shamodha }: RequireAuthTypes) => {
const RequireAuth = ({ children, roles }: RequireAuthTypes) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (roles && !roles.some((role) => user.roles?.includes(role))) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    )
  }

  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            element={
              <RequireAuth>
                <Layout />
              </RequireAuth>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/post" element={<Post />} />
            <Route
              path="/my-post"
              element={
                <RequireAuth roles={["ADMIN", "AUTHOR"]}>
                  <MyPost />
                </RequireAuth>
              }
            />
          </Route>

          {/* 
          <RequireAuth shamodha={""}>
            <div></div>
          </RequireAuth> */}
          {/* <Route
            path="/home"
            element={
              <RequireAuth>
                <Home />
              </RequireAuth>
            }
          /> */}

          {/*Using Outlet create layout for home, post */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
