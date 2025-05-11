// import { supabaseClient } from "@/lib/supabase/client";
// import { NextResponse } from "next/server";
//
// export async function POST() {
//   const { error } = await supabaseClient.auth.signOut();
//
//   if (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
//
//   return NextResponse.redirect(new URL("/login", new URL(Request.URL).origin));
// }
