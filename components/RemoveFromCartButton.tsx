"use client"

import { useState } from "react"
import { getSupabaseBrowser } from "@/utils/supabase-browser"
import { useRouter } from "next/navigation"

export default function RemoveFromCartButton({ itemId }: { itemId: string }) {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const removeFromCart = async () => {
    setLoading(true)
    const supabase = getSupabaseBrowser()
    const { error } = await supabase.from("cart_items").delete().eq("id", itemId)

    if (error) {
      console.error("Error removing item from cart:", error)
      alert("Error removing item from cart")
    } else {
      router.refresh()
    }
    setLoading(false)
  }

  return (
    <button
      onClick={removeFromCart}
      disabled={loading}
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-2 rounded text-sm"
    >
      {loading ? "Removing..." : "Remove"}
    </button>
  )
}

