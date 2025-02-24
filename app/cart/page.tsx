import { getSupabaseServer } from "@/utils/supabase-server"
import Link from "next/link"
import RemoveFromCartButton from "@/components/RemoveFromCartButton"

export default async function Cart() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Cart</h1>
        <p>
          Please{" "}
          <Link href="/signin" className="text-blue-500 hover:underline">
            sign in
          </Link>{" "}
          to view your cart.
        </p>
      </div>
    )
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
      id,
      quantity,
      books (
        id,
        title,
        price
      )
    `)
    .eq("user_id", user.id)

  const total = cartItems?.reduce((sum, item) => sum + item.quantity * item.books.price, 0) || 0

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Cart</h1>
      {cartItems && cartItems.length > 0 ? (
        <>
          <ul className="mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h3 className="font-semibold">{item.books.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ${item.books.price}</p>
                </div>
                <RemoveFromCartButton itemId={item.id} />
              </li>
            ))}
          </ul>
          <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
          <Link href="/checkout" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
            Proceed to Checkout
          </Link>
        </>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  )
}

