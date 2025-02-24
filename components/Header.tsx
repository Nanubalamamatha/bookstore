import Link from "next/link"
import type { Session } from "@supabase/supabase-js"

export default function Header({ session }: { session: Session | null }) {
  return (
    <header className="bg-gray-800 text-white">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Bookstore
        </Link>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-300">
            Home
          </Link>
          <Link href="/books" className="hover:text-gray-300">
            Books
          </Link>
          <Link href="/cart" className="hover:text-gray-300">
            Cart
          </Link>
          {session ? (
            <Link href="/api/auth/signout" className="hover:text-gray-300">
              Sign Out
            </Link>
          ) : (
            <Link href="/signin" className="hover:text-gray-300">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  )
}

