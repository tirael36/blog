import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function PostPage() {
  const router = useRouter()
  const { id } = router.query
  const [post, setPost] = useState<any>(null)

  useEffect(() => {
    if (id) {
      supabase.from('posts').select('*').eq('id', id).single().then(({ data }) => setPost(data))
    }
  }, [id])

  if (!post) return <div>Loading...</div>

  return (
    <div className="bg-white p-6 rounded shadow">
      <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
      <div className="text-gray-500 text-sm mb-4">by {post.author_email}</div>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  )
}