"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseBrowser } from "@/utils/supabase-browser"
import { useRouter } from "next/navigation"

export default function AuthForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = getSupabaseBrowser()

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
        },
      })
      if (error) {
        console.error("Sign up error:", error)
        alert(error.message)
      } else {
        alert("Check your email for the confirmation link")
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) {
        console.error("Sign in error:", error)
        alert(error.message)
      } else {
        router.push("/")
      }
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email" className="block mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div>
        <label htmlFor="password" className="block mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
      </button>
      <p className="text-center">
        {isSignUp ? "Already have an account?" : "Don't have an account?"}
        <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="ml-2 text-blue-500 hover:underline">
          {isSignUp ? "Sign In" : "Sign Up"}
        </button>
      </p>
    </form>
  )
}

