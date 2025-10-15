import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export const runtime = "nodejs"

export async function POST(request: Request) {
  try {
    // Check if the requesting user is an admin
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Verify the user is an admin
    const { data: adminProfile } = await supabase.from("admin_profiles").select("role").eq("id", user.id).single()

    if (!adminProfile || !["admin", "super_admin"].includes(adminProfile.role)) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 })
    }

    const body = await request.json()
    const { email, password, full_name, role } = body

    // Validate input
    if (!email || !password || !full_name || !role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (!["admin", "super_admin", "editor"].includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 })
    }

    // Only super_admins can create other super_admins
    if (role === "super_admin" && adminProfile.role !== "super_admin") {
      return NextResponse.json({ error: "Only super admins can create super admin accounts" }, { status: 403 })
    }

    // Create a Supabase client with service role key for admin operations
    const adminSupabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })

    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await adminSupabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    if (!authData.user) {
      return NextResponse.json({ error: "User creation failed" }, { status: 400 })
    }

    // Add the user to admin_profiles table
    const { error: profileError } = await adminSupabase.from("admin_profiles").insert({
      id: authData.user.id,
      email: authData.user.email,
      full_name,
      role,
      status: "active",
    })

    if (profileError) {
      // If profile creation fails, delete the auth user
      await adminSupabase.auth.admin.deleteUser(authData.user.id)
      return NextResponse.json({ error: profileError.message }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully",
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name,
        role,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 })
  }
}
