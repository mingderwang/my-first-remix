import { createCookieSessionStorage } from "@remix-run/node";
import { Authenticator } from "remix-auth";

type User = {
  username: string;
}

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    secrets: ["s3cret"], // This should be an env variable
    secure: process.env.NODE_ENV === "production",
  },
});

export const authenticator = new Authenticator<User>(sessionStorage);



