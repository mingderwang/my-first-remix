// /app/routes/_auth.login.ts
import { LoaderFunctionArgs, ActionFunctionArgs } from "@remix-run/node";
import { authenticator } from "../authenticator.server";
import { webAuthnStrategy } from "../authenticator.server";
import { sessionStorage } from "../session.server";
import { handleFormSubmit } from "remix-auth-webauthn/browser";
import { useLoaderData, useActionData } from "@remix-run/react"
import { Form } from "@remix-run/react"

export default function Login() {
  const options = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  return (
    <Form onSubmit={handleFormSubmit(options)} method="POST">
      <label>
        Username
        <input type="text" name="username" />
      </label>
      <button formMethod="GET">Check Username</button>
      <button
        name="intent"
        value="registration"
        disabled={options.usernameAvailable !== true}
      >
        Register
      </button>
      <button name="intent" value="authentication">
        Authenticate
      </button>
      {actionData?.error ? <div>{actionData.error.message}</div> : null}
    </Form>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  const result = webAuthnStrategy.generateOptions(request, sessionStorage, user);
  return result;
}

export async function action({ request }: ActionFunctionArgs) {
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
