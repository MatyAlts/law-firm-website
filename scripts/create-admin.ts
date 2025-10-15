import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

async function createAdmin() {
  const email = "natal00203@gmail.com"
  const password = "Mustafa1308"
  const fullName = "Admin User"

  console.log("[v0] Creating admin user...")

  // Create the user in Supabase Auth
  const { data: authData, error: authError } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true, // Auto-confirm the email
  })

  if (authError) {
    console.error("[v0] Error creating auth user:", authError.message)
    return
  }

  console.log("[v0] Auth user created successfully:", authData.user.id)

  // Add the user to admin_profiles table
  const { data: profileData, error: profileError } = await supabase
    .from("admin_profiles")
    .insert({
      id: authData.user.id,
      email: email,
      full_name: fullName,
    })
    .select()

  if (profileError) {
    console.error("[v0] Error creating admin profile:", profileError.message)
    return
  }

  console.log("[v0] Admin profile created successfully!")
  console.log("[v0] Admin user details:")
  console.log("[v0] Email:", email)
  console.log("[v0] Password:", password)
  console.log("[v0] User ID:", authData.user.id)
}

createAdmin()
