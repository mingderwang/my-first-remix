import { LoaderArgs } from "@remix-run/node";
import { authenticator } from "../authenticator.server"
import { useLoaderData } from "@remix-run/react";

export function loader({request}: LoaderArgs ) {
  const user = authenticator.isAuthenticated(request)
  return { user }
}

export default function Index() {
  const { user } = useLoaderData<typeof loader>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      { user?.username ? <p>Hi {user.username}</p> : <p>Hi guest</p>}
    </div>
  );
}
