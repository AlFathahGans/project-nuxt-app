import { defineEventHandler, readBody, setCookie } from "h3";
import { z } from "zod";
import { getUser } from "../repositories/user";

const schema = z.object({
  username: z.string().min(4),
  password: z.string().min(4),
});

export default defineEventHandler(async (event) => {
  try {
    console.log("Request received");
    const body = await readBody(event);
    console.log("Body read:", body);
    const parsed = schema.parse(body);
    const isValidUser = await getUser(parsed.username, parsed.password);
    console.log("Is valid user:", isValidUser);

    if (isValidUser) {
      const role = parsed.username === "admin" ? "admin" : "employee";
      setCookie(
        event,
        "session",
        JSON.stringify({ user: { username: parsed.username, role } }),
        {
          httpOnly: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7
        }
      );
      return { redirect: "/home" };
    } else {
      throw createError({
        statusCode: 403,
        statusMessage: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error in auth handler:", error);
    throw createError({
      statusCode: 500,
      statusMessage: "Internal Server Error",
    });
  }
});
