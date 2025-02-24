"use client"

import { useState } from "react"
import { getSupabaseBrowser } from "@/utils/supabase-browser"

export default function AddToCartButton({ bookId }: { bookId: string }) {
  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    setLoading(true)
    const supabase = getSupabaseBrowser()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert("Please sign in to add items to your cart")
      setLoading(false)
      return
    }

    // Check if the item already exists in the cart
    const { data: existingItem, error: fetchError } = await supabase
      .from("cart_items")
      .select("id, quantity")
      .eq("user_id", user.id)
      .eq("book_id", bookId)
      .single()

    if (fetchError && fetchError.code !== "PGRST116") {
      console.error("Error fetching cart item:", fetchError)
      alert("Error adding item to cart")
      setLoading(false)
      return
    }

    if (existingItem) {
      // If the item exists, update the quantity
      const { error: updateError } = await supabase
        .from("cart_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id)

      if (updateError) {
        console.error("Error updating cart item:", updateError)
        alert("Error adding item to cart")
      } else {
        alert("Item quantity updated in cart")
      }
    } else {
      // If the item doesn't exist, insert a new one
      const { error: insertError } = await supabase
        .from("cart_items")
        .insert({ user_id: user.id, book_id: bookId, quantity: 1 })

      if (insertError) {
        console.error("Error inserting cart item:", insertError)
        alert("Error adding item to cart")
      } else {
        alert("Item added to cart")
      }
    }

    setLoading(false)
  }

  return (
    <button
      onClick={addToCart}
      disabled={loading}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
    >
      {loading ? "Adding..." : "Add to Cart"}
    </button>
  )
}

