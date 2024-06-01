import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then(
    (d) => ({
      default: d.ReactQueryDevtools,
    }),
  ),
);

export function Devtools() {
  const [showDevtools, setShowDevtools] = React.useState(false);

  React.useEffect(() => {
    window.toggleRqDevtools = () => setShowDevtools((prev) => !prev);
  }, []);

  return (
    <>
      {/* this will only be rendered in development */}
      <ReactQueryDevtools buttonPosition="bottom-left" initialIsOpen={false} />

      {showDevtools && (
        <React.Suspense fallback={null}>
          <ReactQueryDevtoolsProduction />
        </React.Suspense>
      )}
    </>
  );
}
