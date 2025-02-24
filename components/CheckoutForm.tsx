"use client"

import type React from "react"

import { useState } from "react"
import { getSupabaseBrowser } from "@/utils/supabase-browser"
import { useRouter } from "next/navigation"

export default function CheckoutForm({ total }: { total: number }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const supabase = getSupabaseBrowser()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to complete your order")
      setLoading(false)
      return
    }

    // Create order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({ user_id: user.id, total_amount: total, status: "pending" })
      .select()
      .single()

    if (orderError) {
      console.error("Error creating order:", orderError)
      alert("Error creating order")
      setLoading(false)
      return
    }

    // Get cart items
    const { data: cartItems } = await supabase
      .from("cart_items")
      .select("book_id, quantity, books(price)")
      .eq("user_id", user.id)

    // Create order items
    const orderItems = cartItems?.map((item) => ({
      order_id: order.id,
      book_id: item.book_id,
      quantity: item.quantity,
      price: item.books?.price,
    }))

    const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems || [])

    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError)
      alert("Error creating order items")
      setLoading(false)
      return
    }

    // Clear cart
    await supabase.from("cart_items").delete().eq("user_id", user.id)

    // Update order status
    await supabase.from("orders").update({ status: "completed" }).eq("id", order.id)

    alert("Order placed successfully!")
    router.push("/orders")
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md">
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2">
          Name
        </label>
        <input type="text" id="name" required className="w-full px-3 py-2 border rounded" />
      </div>
      <div className="mb-4">
        <label htmlFor="address" className="block mb-2">
          Address
        </label>
        <textarea id="address" required className="w-full px-3 py-2 border rounded"></textarea>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
      >
        {loading ? "Processing..." : "Place Order"}
      </button>
    </form>
  )
}

