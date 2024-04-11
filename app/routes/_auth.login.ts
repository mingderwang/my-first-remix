// /app/routes/_auth.login.ts
export async function loader({ request }: LoaderFunctionArgs) {
    const user = await authenticator.isAuthenticated(request);
  
    return webAuthnStrategy.generateOptions(request, sessionStorage, user);
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