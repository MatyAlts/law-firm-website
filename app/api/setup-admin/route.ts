import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST() {
  try {
    // Create a Supabase client with service role key for admin operations
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    const email = "natal00203@gmail.com"
    const password = "Mustafa1308"

    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm the email
    })

    if (authError) {
      console.error("[v0] Auth error:", authError)
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "User creation failed" }, { status: 400 })
    }

    // Add the user to admin_profiles table
    const { error: profileError } = await supabase.from("admin_profiles").insert({
      id: authData.user.id,
      email: authData.user.email,
      full_name: "Admin",
      role: "super_admin",
      status: "active",
    })

    if (profileError) {
      console.error("[v0] Profile error:", profileError)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: {
        id: authData.user.id,
        email: authData.user.email,
      },
    })
  } catch (error) {
    console.error("[v0] Setup error:", error)
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
