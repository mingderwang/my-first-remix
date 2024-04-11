// /app/routes/_auth.login.ts
import { authenticator } from "../authenticator.server";
import { LoaderArgs, ActionArgs } from "@remix-run/node";
import { webAuthnStrategy } from "../authenticator.server";
import { sessionStorage } from "../session.server";

export async function loader({ request }: LoaderArgs) {
    const user = await authenticator.isAuthenticated(request);
  
    return webAuthnStrategy.generateOptions(request, sessionStorage, user);
  }
  
  export async function action({ request }: ActionArgs) {
    try {
      await authenticator.authenticate("webauthn", request, {
        successRedirect: "/",
      });
      return { error: null };
    } catch (error) {
      // This allows us to return errors to the page without triggering the error boundary.
      if (error instanceof Response && error.status >= 400) {
        return { error: (await error.json()) as { message: string } };
      }
      throw error;
    }
  }