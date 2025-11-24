import api from "./api"

export const createPost = async (data: any) => {
  const res = await api.post("/post/create", data, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
  return res.data
}

export const getAllPost = async (page: number, limit: number) => {
  const res = await api.get(`/post?page=${page}&limit=${limit}`)
  return res.data
}

export const getMyPost = async (page: number, limit: number) => {
  const res = await api.get(`/post/me?page=${page}&limit=${limit}`)
  return res.data
}
