import { defineEventHandler, deleteCookie } from "h3";

export default defineEventHandler((event) => {
  // Hapus cookie session
  deleteCookie(event, "session");
  return { message: "Logged out successfully" };
});
