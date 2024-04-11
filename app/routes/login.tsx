import { handleFormSubmit } from "remix-auth-webauthn/server";
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