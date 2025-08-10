import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) setError(error.message)
      else setIsSignUp(false)
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) setError(error.message)
      else router.push('/')
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">{isSignUp ? 'Sign Up' : 'Login'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input className="w-full p-2 border rounded" placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        {error && <div className="text-red-500">{error}</div>}
        <button className="w-full bg-blue-700 text-white p-2 rounded" type="submit">{isSignUp ? 'Sign Up' : 'Login'}</button>
        <div className="text-center text-sm mt-2">
          {isSignUp ? (
            <span>
              Have an account?{' '}
              <button type="button" className="text-blue-700 underline" onClick={() => setIsSignUp(false)}>Login</button>
            </span>
          ) : (
            <span>
              No account?{' '}
              <button type="button" className="text-blue-700 underline" onClick={() => setIsSignUp(true)}>Sign Up</button>
            </span>
          )}
        </div>
      </form>
    </div>
  )
}