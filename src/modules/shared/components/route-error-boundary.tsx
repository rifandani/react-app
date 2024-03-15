import { Button } from 'react-aria-components';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export function RouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <div>This page doesn&apos;t exist!</div>;

    if (error.status === 401)
      return <div>You aren&apos;t authorized to see this</div>;

    if (error.status === 503) return <div>Looks like our API is down</div>;

    if (error.status === 418) return <div>🫖</div>;

    // the response json is automatically parsed to `error.data`, we also have access to the status
    return (
      <main className="flex min-h-screen flex-col items-center justify-center">
        <h1 className="mb-3 text-primary-content">Something went wrong</h1>

        <Button
          className="btn btn-neutral text-primary-content"
          type="button"
          onPress={() => {
            window.location.assign(window.location.href);
          }}
        >
          Reload Page
        </Button>

        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    );
  }

  // rethrow to let the parent error boundary handle it when it's not a special case for this route
  throw error;
}
