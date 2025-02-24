import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs"
import type { Database } from "./database.types"

let client: ReturnType<typeof createBrowserSupabaseClient<Database>> | null = null

export const getSupabaseBrowser = () => {
  if (client) return client

  client = createBrowserSupabaseClient<Database>()
  return client
}

