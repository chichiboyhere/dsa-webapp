// import { SignJWT, jwtVerify } from "jose";

// const secret = new TextEncoder().encode(process.env.JWT_SECRET);

// export async function createToken(payload: any) {
//   return await new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setExpirationTime("2h") // session expires in 2 hours
//     .sign(secret);
// }

// export async function verifyToken(token: string) {
//   try {
//     const { payload } = await jwtVerify(token, secret);
//     return payload;
//   } catch {
//     return null;
//   }
// }

// lib/auth.ts
import { SignJWT, jwtVerify } from "jose";

// Define valid roles clearly
export type UserRole = "ADMIN" | "STUDENT";
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "fallback-secret",
);

export async function signJWT(payload: { id: string; role: string }) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("8h")
    .sign(SECRET);
}

export async function verifyJWT(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload as { id: string; role: string };
  } catch (error) {
    return null;
  }
}
