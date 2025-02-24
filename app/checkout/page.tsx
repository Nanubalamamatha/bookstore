import { getSupabaseServer } from "@/utils/supabase-server"
import CheckoutForm from "@/components/CheckoutForm"

export default async function Checkout() {
  const supabase = getSupabaseServer()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>
        <p>Please sign in to proceed with checkout.</p>
      </div>
    )
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select(`
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
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <ul>
          {cartItems?.map((item) => (
            <li key={item.books.id} className="flex justify-between">
              <span>
                {item.books.title} (x{item.quantity})
              </span>
              <span>${(item.quantity * item.books.price).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        <p className="text-xl font-bold mt-2">Total: ${total.toFixed(2)}</p>
      </div>
      <CheckoutForm total={total} />
    </div>
  )
}

