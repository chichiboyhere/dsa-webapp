// //components/LogoutButton.tsx

// // }

// "use client";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function LogoutButton() {
//   const router = useRouter();
//   const { logout: clearClientState } = useAuth();

//   const handleLogout = async () => {
//     try {
//       // 1. Clear the server-side cookie
//       await fetch("/api/auth/logout", { method: "POST" });

//       // 2. Clear the local context and localStorage
//       clearClientState();

//       // 3. Redirect and refresh
//       router.push("/login");
//       router.refresh();
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//     >
//       Logout
//     </button>
//   );
// }

// "use client";

// import { useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";

// export default function LogoutButton() {
//   const router = useRouter();
//   const { logout, role } = useAuth();

//   const handleLogout = async () => {
//     await fetch("/api/auth/logout", { method: "POST" });
//     const redirectPath = role === "ADMIN" ? "/admin-login" : "/login";

//     logout(); // Clear global state
//     router.push(redirectPath);
//     router.refresh();
//   };

//   return (
//     <button
//       onClick={handleLogout}
//       className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition font-bold"
//     >
//       Logout
//     </button>
//   );
// }

"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
// Updated LogoutButton.tsx (Simplified for use in both places)
export default function LogoutButton() {
  const router = useRouter();
  const { logout, role } = useAuth();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    const dest = role === "ADMIN" ? "/admin-login" : "/login";
    logout();
    router.push(dest);
    router.refresh();
  };

  return (
    <button
      onClick={handleLogout}
      /* Added w-full for mobile compatibility, md:w-auto for desktop */
      className="w-full md:w-auto bg-red-600 hover:bg-red-700 text-white px-6 py-3 md:py-2 rounded-xl md:rounded-lg transition font-bold text-lg md:text-sm"
    >
      Logout
    </button>
  );
}
