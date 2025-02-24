import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "./database.types"

export const getSupabaseServer = () => createServerComponentClient<Database>({ cookies })

