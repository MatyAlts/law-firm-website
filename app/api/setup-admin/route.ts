import { NextResponse } from "next/server"

export async function POST() {
  return NextResponse.json({
    success: true,
    message: "El backend en Java crea automáticamente un usuario admin@lawfirm.com con contraseña changeme.",
    user: { email: "admin@lawfirm.com" },
  })
}
