import { Navbar } from '@shared/components/organisms';
import { Outlet } from 'react-router-dom';

export default function NavbarWrapper() {
  return (
    <Navbar>
      <Outlet />
    </Navbar>
  );
}
