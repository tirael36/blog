import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import 'react-quill/dist/quill.snow.css'

export default function Editor({ user }: { user: any }) {
  const router = useRouter()
  const [role, setRole] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/login')
    } else {
      // Fetch user role from Supabase
      supabase.from('profiles').select('role').eq('id', user.id).single().then(({ data }) => {
        if (!data || !['admin', 'author'].includes(data.role)) {
          router.push('/')
        } else {
          setRole(data.role)
        }
      })
    }
  }, [user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title || !content) return
    await supabase.from('posts').insert([
      { title, content, author_id: user.id, author_email: user.email }
    ])
    setTitle('')
    setContent('')
    router.push('/')
  }

  if (!user || !role) return null

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">New Post</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Publish</button>
      </form>
    </div>
  )
}