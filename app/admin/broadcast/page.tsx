//app/admin/broadcast/page.tsx

import { cookies } from "next/headers";
import { verifyJWT } from "@/lib/auth";
import { redirect } from "next/navigation";
import BroadcastEditor from "@/components/admin/BroadcastEditor";

export default async function AdminBroadcast() {
  // 1. Get the cookie using the name defined in your proxy.ts ("token")
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  // 2. Verify the token
  const payload = token ? await verifyJWT(token) : null;

  // 3. Strict Role Check (matches your proxy logic)
  if (!payload || payload.role !== "ADMIN") {
    redirect("/admin-login");
  }

  return (
    <div className="px-4 sm:px-6 py-12 my-12 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold mb-8 text-slate-900 text-center">
          Create Announcement
        </h1>

        <div className="space-y-6">
          {/* Use the ID from the payload. 
              Make sure your login logic originally included 'id' in the JWT! */}
          <BroadcastEditor adminId={payload.id as string} />
        </div>
      </div>
    </div>
  );
}
