import { useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { createPost, getAllPost } from "../services/post"

export default function Post() {
  const [post, setPost] = useState([])
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState("")

  const fetchData = async (pageNumber = 1) => {
    try {
      const data = await getAllPost(pageNumber, 2)
      setPost(data?.data)
      setTotalPage(data?.totalPages)
      setPage(pageNumber)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSavePost = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("content", content)
      formData.append("tags", tags)
      if (image) formData.append("image", image)

      const res = await createPost(formData)

      await fetchData(1)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="p-6">
      <form
        onSubmit={handleSavePost}
        className="bg-white shadow-lg rounded-xl p-6 space-y-4 border"
      >
        <h2 className="text-xl font-semibold mb-2">Create New Post</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
        />

        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded-lg p-2 h-24 focus:ring focus:ring-blue-300"
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full border rounded-lg p-2 focus:ring focus:ring-blue-300"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full border p-2 rounded-lg"
        />

        {preview && (
          <div className="w-full mt-3">
            <img
              src={preview}
              className="w-full h-48 object-cover rounded-lg border"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Post
        </button>
      </form>

      <h2 className="text-2xl font-bold mb-6 text-center">All Post</h2>
      <div className="grid grid-cols-3 gap-6">
        {post.map((p: any, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl overflow-hidden border p-3"
          >
            <h3>{p?.title}</h3>
            <p>{p?.content}</p>
            <img src={p?.imageURL} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center mt-8">
        <button
          onClick={() => {
            fetchData(page - 1)
          }}
          disabled={page === 1}
          className="px-4 py-2 rounded bg-gray-400 disabled:opacity-50"
        >
          Prev
        </button>
        <div className="text-sm text-gray-600">
          Page {page} of {totalPage}
        </div>
        <button
          onClick={() => {
            fetchData(page + 1)
          }}
          disabled={page === totalPage}
          className="px-4 py-2 rounded bg-gray-400 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}
