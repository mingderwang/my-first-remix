// /app/authenticator.server.ts
import { WebAuthnStrategy } from "remix-auth-webauthn";
import {
  getAuthenticators,
  getUserByUsername,
  getAuthenticatorById,
  type User,
  createUser,
  createAuthenticator,
  getUserById,
} from "./db";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "./session.server";

export let authenticator = new Authenticator<User>(sessionStorage);

export const webAuthnStrategy = new WebAuthnStrategy<User>(
  {
    // The human-readable name of your app
    // Type: string | (response:Response) => Promise<string> | string
    rpName: "Remix Auth WebAuthn",
    // The hostname of the website, determines where passkeys can be used
    // See https://www.w3.org/TR/webauthn-2/#relying-party-identifier
    // Type: string | (response:Response) => Promise<string> | string
    rpID: (request) => new URL(request.url).hostname,
    // Website URL (or array of URLs) where the registration can occur
    origin: (request) => new URL(request.url).origin,
    // Return the list of authenticators associated with this user. You might
    // need to transform a CSV string into a list of strings at this step.
    getUserAuthenticators: async (user) => {
      const authenticators = await getAuthenticators(user);

      return authenticators.map((authenticator) => ({
        ...authenticator,
        transports: authenticator.transports.split(","),
      }));
    },
    // Transform the user object into the shape expected by the strategy.
    // You can use a regular username, the users email address, or something else.
    getUserDetails: (user) =>
      user ? { id: user.id, username: user.username } : null,
    // Find a user in the database with their username/email.
    getUserByUsername: (username) => getUserByUsername(username),
    getAuthenticatorById: (id) => getAuthenticatorById(id),
  },
  async function verify({ authenticator, type, username }) {
    // Verify Implementation Here
  }
);

authenticator.use(webAuthnStrategy);