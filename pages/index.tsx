import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
  const [posts, setPosts] = useState<any[]>([])

  useEffect(() => {
    supabase.from('posts').select('*').order('created_at', { ascending: false }).then(({ data }) => {
      setPosts(data || [])
    })
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Latest Posts</h1>
      <div className="space-y-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded shadow">
            <Link href={`/post/${post.id}`}><span className="text-xl font-semibold cursor-pointer">{post.title}</span></Link>
            <div className="text-gray-500 text-sm mt-1">by {post.author_email}</div>
            <div className="prose mt-2" dangerouslySetInnerHTML={{ __html: post.content.substring(0, 200) + '...' }} />
          </div>
        ))}
      </div>
    </div>
  )
}