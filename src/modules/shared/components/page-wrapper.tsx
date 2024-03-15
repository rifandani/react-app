import { Navbar } from '#shared/components/navbar/navbar';
import { RouterProvider as RACRouterProvider } from 'react-aria-components';
import { Outlet, useNavigate } from 'react-router-dom';

/**
 * page wrapper for router nested layout
 *
 * RAC such as Link, Menu, Tabs, Table, and many others support rendering elements as links that perform navigation when the user interacts with them.
 * It needs to be wrapped by RAC RouterProvider component.
 */
export function PageWrapper() {
  const navigate = useNavigate();

  return (
    <RACRouterProvider navigate={navigate}>
      <Navbar>
        <Outlet />
      </Navbar>
    </RACRouterProvider>
  );
}
