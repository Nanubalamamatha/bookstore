import Link from "next/link"

export default function Home() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to our Online Bookstore</h1>
      <p className="mb-8">Browse our collection and find your next favorite book!</p>
      <Link href="/books" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
        Browse Books
      </Link>
    </div>
  )
}

