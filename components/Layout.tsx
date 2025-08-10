import React from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'

export default function Layout({ children, user }: { children: React.ReactNode, user: any }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-blue-900 text-white p-4 flex justify-between items-center">
        <Link href="/"><span className="font-bold text-xl cursor-pointer">Tirael</span></Link>
        <nav className="space-x-4">
          {user ? (
            <>
              <Link href="/editor"><span className="hover:underline cursor-pointer">Editor</span></Link>
              <button
                onClick={async () => { await supabase.auth.signOut(); location.reload(); }}
                className="bg-blue-700 px-3 py-1 rounded"
              >Logout</button>
            </>
          ) : (
            <Link href="/login"><span className="hover:underline cursor-pointer">Login</span></Link>
          )}
        </nav>
      </header>
      <main className="flex-1 max-w-3xl mx-auto w-full p-6">{children}</main>
      <footer className="text-center p-4 text-gray-400">© 2025 Tirael</footer>
    </div>
  )
}