import { getSupabaseServer } from "@/utils/supabase-server"
import AddToCartButton from "@/components/AddToCartButton"

export default async function Books() {
  const supabase = getSupabaseServer()
  const { data: books } = await supabase.from("books").select("*")

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Books</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books?.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            <p className="mb-2">By {book.author}</p>
            <p className="mb-2">Price: ${book.price}</p>
            <p className="mb-4">In stock: {book.stock}</p>
            <AddToCartButton bookId={book.id} />
          </div>
        ))}
      </div>
    </div>
  )
}

