import { Navbar } from '@shared/components/navbar/navbar';
import { Outlet } from 'react-router-dom';

/**
 * wrap the page with navbar
 */
export function PageWrapper() {
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
}
